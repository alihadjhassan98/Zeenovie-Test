import { Injectable } from "@nestjs/common";
import { Notification } from "./schemas/notification.schema";
import { InjectModel } from "@nestjs/mongoose";
import mongoose from "mongoose";

export interface SendNotificationRequest {
    offerId:string;
    senderId: string;
    recipientId: string;
    content: string;
    category: string;
    readAt:Date;
}

export interface SendNotificationResponse {
    notification: Notification;
}

@Injectable()
export class NotificationService {
    constructor(
        @InjectModel(Notification.name)
        private notificationsModel: mongoose.Model<Notification>,
    ) { }

    async sendNotification(
        request: SendNotificationRequest,
    ): Promise<SendNotificationResponse> {
        const {offerId, senderId, recipientId, content, category,readAt } = request;

        const notification = await this.notificationsModel.create({
            offerId,
            senderId,
            
            recipientId,
            content,
            category,
            readAt
        });

        return { notification };
    }

    async getNotificationsByRecipientId(recipientId: string): Promise<Notification[]> {
        return this.notificationsModel.find({ recipientId }).sort({ createdAt: 'desc' });
    }


    async findNotificationById(id: string): Promise<Notification | null> {
        const notification = await this.notificationsModel.findById(id);
        return notification;
    }

    async updateNotificationById(id: string, updatePayload: Notification): Promise<Notification> {
        const updatedNotification = await this.notificationsModel.findByIdAndUpdate(id, updatePayload, { new: true });
        return updatedNotification;
    }



}
