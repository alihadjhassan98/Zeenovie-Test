import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema({
    timestamps: true
})
export class Langue {
    @Prop()
    IdUser: string;
    
    @Prop({ type: String, required: true })
    language: string;

    @Prop({ type: String, required: true })
    level: string;

    @Prop({ type: String })
    certificate: string;

    @Prop({ type: Number })
    score: number;
}

export const LangueDataschema = SchemaFactory.createForClass(Langue);
