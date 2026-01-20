import {
    WebSocketGateway,
    SubscribeMessage,
    MessageBody,
    ConnectedSocket
} from "@nestjs/websockets";
import { Socket } from "socket.io";
import { EventsService } from "../events/events.service";
import { MetricsServices } from "../health/metrics.service";
import { logger } from "../logger";
import { randomUUID } from "crypto";

@WebSocketGateway({ cors: true })
export class InferenceGateway {

    constructor(
        private readonly eventService: EventsService,
        private readonly metricsService: MetricsServices,
    ) { }

    handleConnection(client: Socket) {
        const token = client.handshake.auth?.token;

        if (!token || token !== 'valid-token') {
            logger.warn(`Conexão rejeitada. Token inválido: ${token}`);
            client.disconnect();
        } else {
            logger.info(`Cliente conectado: ${client.id}`);
        }
    }

    @SubscribeMessage('start-inference')
    handleStart(
        @MessageBody() data: { requestId: string },
        @ConnectedSocket() client: Socket
    ) {
        const { requestId } = data;
        logger.info(`Início da inferência para requestId: ${requestId}`);

        const interval = setInterval(() => {
            const start = Date.now();
            const confidence = Math.random();
            const frameId = randomUUID();
            const riskLevel = confidence > 0.7 ? 'HIGH' : 'LOW';

            client.emit('stream', {
                ts: new Date().toISOString(),
                frameId,
                overlay: {
                    boxes: [],
                    emotions: [
                        { label: 'happy', score: confidence }
                    ],
                    risk: {
                        level: riskLevel,
                        score: confidence,
                        reasons: riskLevel === 'HIGH' ? ['mock-risk'] : []
                    }
                }
            });

            // Persistência (EXIGIDO NO TESTE)
            this.eventService.saveEvent({
                requestId,
                frameId,
                label: 'happy',
                confidence,
                riskLevel,
                timestamp: new Date()
            });

            logger.info(
                `Evento enviado: requestId=${requestId}, frameId=${frameId}, riskLevel=${riskLevel}, confidence=${confidence.toFixed(2)}`
            );

            // Registro de métricas
            const latency = Date.now() - start;
            this.metricsService.recordEvent(latency, riskLevel);

        }, 500);

        client.on('disconnect', () => {
            clearInterval(interval);
            logger.info(`Cliente desconectado: ${client.id}`);
        });

        return { message: 'stream iniciado' };
    }
}