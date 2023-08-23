import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Rating extends Document {
  @Prop({ required: true })
  consultantId: string;

  @Prop({ required: true })
  userId: string;

  @Prop({ required: true })
  ratingValue: number;

  @Prop({ default: Date.now })
  createdAt: Date;
}

export const RatingSchema = SchemaFactory.createForClass(Rating);
