// notification.schema.ts
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

@Schema({
 
})
export class Notification {

  @Prop({ required: false })
  offerId: string | undefined;
  @Prop({ required: false })
  senderId: string | undefined;

  @Prop({ required: false })
  recipientId: string | undefined;

  @Prop({ required: false, minlength: 5, maxlength: 240 })
  content: string | undefined;

  @Prop({ required: false })
  category: string | undefined;

  @Prop({ type: Date, required: false, default: null })
  readAt: Date | null;

  @Prop({ default: Date.now })
  createdAt: Date | undefined;
}

export const NotificationSchema = SchemaFactory.createForClass(Notification);
