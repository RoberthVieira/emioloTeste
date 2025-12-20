import {
    WebSocketGateway,
    SubscribeMessage,
    MessageBody,
    ConnectedSocket
} from "@nestjs/websockets";
import { Socket } from "socket.io";
import { EventsService } from "../events/events.service";
import { randomUUID } from "crypto";

@WebSocketGateway({ cors: true })
export class InferenceGateway {

    constructor(
        private readonly eventService: EventsService,
    ) { }

    handleConnection(client: Socket) {
        const token = client.handshake.auth?.token;

        if (token !== 'valid-token') {
            client.disconnect();
        }
    }

    @SubscribeMessage('start-inference')
    handleStart(
        @MessageBody() data: { requestId: string },
        @ConnectedSocket() client: Socket
    ) {
        const { requestId } = data;

        const interval = setInterval(() => {

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

        }, 500);

        client.on('disconnect', () => {
            clearInterval(interval);
        });

        return { message: 'stream iniciado' };
    }
}