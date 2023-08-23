import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Skills {
  @Prop()
  IdUser: string;
  
  @Prop({ required: false })
  competence: string;

  @Prop({ required: false })
  level: string;

  @Prop({ required: false })
  description: string;
}

export const SkillsSchema = SchemaFactory.createForClass(Skills);
