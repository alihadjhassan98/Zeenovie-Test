import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Comments {

    @Prop()
    IdUser: string;

    @Prop()
    entrepriseId: String;

    // @Prop()
    // consultantId: String;
    @Prop()
    likedBy: string[]; 
    @Prop()
    likes: number;

    @Prop({ required: true })
    content: string;

    @Prop({ default: Date.now })
    commentedAt: Date;

    @Prop()
    status: string;
}
export const CommentsSchema = SchemaFactory.createForClass(Comments);