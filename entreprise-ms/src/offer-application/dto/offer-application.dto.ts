import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
@Schema()
export class OfferApplication {

    @Prop()
    offerId: string
    @Prop()
    entrepriseId: String
    @Prop()
    consultantId: String
    @Prop()
    appliedAt: Date = new Date()
    @Prop({ default: 'Pending' })
    status: string;
}

export const OfferApplicationSchema = SchemaFactory.createForClass(OfferApplication);