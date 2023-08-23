import { Logger } from '@nestjs/common';
import {
  ConnectedSocket,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({ cors: true })
export class SocketIoGateway {
  @WebSocketServer()
  server!: Server;
  private logger = new Logger('SocketIoGateway');
  constructor() {
  }
  afterInit(server: Server) {
    this.logger.log('SocketIoGateway initialized');
  }
  handleConnection(@ConnectedSocket() client: Socket,) {
    const recipientId = client.handshake.query.recipientId;
    this.logger.log(`Client connected with recipientId: ${recipientId}`);
    if (recipientId) {
      client.join(recipientId); // create a room for the recipient

    } else {
      this.logger.warn('Connected client without recipientId');
    }
  }
  handleDisconnect(@ConnectedSocket() client: Socket) {
    const recipientId = client.handshake.query.recipientId;
    console.log('Client disconnected with recipientId', recipientId);
  }

  emitNewNotification(recipientId: string, notification: any) {
    this.logger.log(`Emitting newNotification to recipientId: ${recipientId}`);
    this.logger.log(`Notification data: ${JSON.stringify(notification)}`);
    this.server.to(recipientId).emit('newNotification', notification); // emit event only to the recipient's room
  }
}

