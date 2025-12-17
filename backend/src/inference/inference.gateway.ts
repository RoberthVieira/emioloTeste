import { 
    WebSocketGateway,
    SubscribeMessage,
    MessageBody,
    ConnectedSocket
} from "@nestjs/websockets";
import { Socket } from "socket.io";
import { EventsService } from "../events/events.service";


@WebSocketGateway({cors: true})
export class InferenceGateway {

    constructor(
        private readonly eventService: EventsService,
    ) {}

    handleConnection(client: Socket) {
        const token = client.handshake.auth?.token;

        if(token !== 'valid-token') {
            client.disconnect();
        }
    }

    @SubscribeMessage('start-inference')
    handleStart(
        @MessageBody() data: any,
        @ConnectedSocket() client: Socket
    ) {
        const {requestId} = data;

        const interval = setInterval(() => {

            const confidence = Math.random();

            client.emit('inference-result', {
                requestId,
                status: 'processing',
                inference: {
                    label: 'mock',
                    confidence,
                },
                timestamp: Date.now(),
            });

            this.eventService.saveEvent({
                requestId,
                label: 'mock',
                confidence,
            });

        }, 500)

        client.on('disconnect', () => {
            clearInterval(interval);  
        })

        return {message: 'conexão ok'};
    }
}