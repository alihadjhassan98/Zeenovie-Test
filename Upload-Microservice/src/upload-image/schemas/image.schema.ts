import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ImageDocument = Image & Document;

@Schema()
export class Image {

  @Prop()
  IdUser: string;

  @Prop({ required: true })
  data: string;

  get imageData(): Buffer {
    return Buffer.from(this.data, 'base64');
  }

  static updateImage(image: Image, newData: string) {
    image.data = newData;
  }
}

export const ImageSchema = SchemaFactory.createForClass(Image);
