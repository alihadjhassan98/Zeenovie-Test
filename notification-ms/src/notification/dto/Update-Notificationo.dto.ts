interface UpdateNotificationDto {
    offerId:string;
    senderId: string;
    recipientId: string;
    content: string;
    category: string;
    readAt: Date;
    createdAt: Date;
}
