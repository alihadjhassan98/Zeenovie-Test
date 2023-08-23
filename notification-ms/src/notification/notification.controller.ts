import { Body, Controller, Get, Header, NotFoundException, Param, Post, Put, } from '@nestjs/common';
import { NotificationService, SendNotificationRequest } from './notification.service';
import { SocketIoGateway } from 'src/socket-io.gateway';
import { Notification } from './schemas/notification.schema';
@Controller('notifications')
export class NotificationController {
    constructor(
        private readonly notificationService: NotificationService,
        private readonly socketIoGateway: SocketIoGateway,
    ) { }

    @Get('/:userId')
    @Header('Access-Control-Allow-Origin', '*')
    async list(@Param('userId') userId: string) {
        return this.notificationService.getNotificationsByRecipientId(userId);
    }



    @Post()
    @Header('Access-Control-Allow-Origin', '*')
    async create(@Body() body: SendNotificationRequest) {
        const { offerId,   senderId, recipientId, content, category,readAt } = body;

        const request: SendNotificationRequest = {
            offerId,
            senderId,
            recipientId,
            content,
            category,
            readAt
        };

        const { notification } = await this.notificationService.sendNotification(
            request,
        );

        this.socketIoGateway.emitNewNotification(recipientId, notification);

        return notification;
    }

//    @MessagePattern
//     async update(@Body() data: { id: string, updateDataDto: UpdateNotificationDto }): Promise< Notification> {
//         const { id, updateDataDto } = data;
//         const updatedData =await this.notificationService.updateNotificationById(id, updateDataDto);
//         return updatedData;
//     }     


   @Put('/:id')
    async update(@Param('id') id: string, @Body() updateDataDto: UpdateNotificationDto ): Promise< Notification> {
        const updatedData =await this.notificationService.updateNotificationById(id, updateDataDto);
        return updatedData;
    }   
}
