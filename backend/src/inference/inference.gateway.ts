import { 
    WebSocketGateway,
    SubscribeMessage,
    MessageBody,
    ConnectedSocket
} from "@nestjs/websockets";
import { Socket } from "socket.io";


@WebSocketGateway({cors: true})
export class InferenceGateway {

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
            client.emit('inference-result', {
                requestId,
                status: 'processing',
                inference: {
                    label: 'mock',
                    confidence: Math.random(),
                },
                timestamp: Date.now(),
            });
        }, 500)

        client.on('disconnect', () => {
            clearInterval(interval);  
        })

        return {message: 'conexão ok'};
    }
}