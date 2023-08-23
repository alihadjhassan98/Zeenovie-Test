import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';


@Schema()
export class Entreprise  {

    @Prop()
    IdUser: string;

    @Prop()
    nameE: string;

    @Prop()
    activitySectorE: string;
    @Prop()
    categoryE:string;
    @Prop()
    titleEntreprise: string;

    @Prop()
    sizeE: string;

    @Prop()
    descriptionE: string;

    @Prop()
    countryE: string;

    @Prop()
    regionE: string;

    @Prop()
    villeE: string;

    @Prop()
    ZIPcodeE: string;

    @Prop()
    adresse: string;

    @Prop()
    streetNumber: string;

    @Prop({ type: [String], required: true })
    telE: string[];

    @Prop({ type: [String], required: true })
    telOwner: string[];

    @Prop()
    linkWebSite: string;
}

export const EntrepriseSchema = SchemaFactory.createForClass(Entreprise);
