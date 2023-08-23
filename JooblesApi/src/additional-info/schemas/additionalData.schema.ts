import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';


export type AdditionalInfoDocument = AdditionalInfo & Document;

@Schema()
export class AdditionalInfo {

  @Prop()
  IdUser: string;
 
  @Prop()
  interests: string;

  @Prop()
  strengths: string;
  
}
export const AdditionalInfoSchema = SchemaFactory.createForClass(AdditionalInfo);
