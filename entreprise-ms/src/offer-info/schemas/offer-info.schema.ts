import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';


@Schema()
export class OfferInfo {

    @Prop()
    IdUser: string;

    @Prop()
    titleO: string;

    @Prop()
    descriptionE: string;

    @Prop()
    referenceO: string; 

    @Prop({ type: [String], required: true })
    TypesOfPositions: string[];
    @Prop()
    Availability: string;

    @Prop()
    DesiredMinimumNetSalary: number;
    @Prop()
    DesiredMaximumNetSalary: number;

    @Prop()
    in:string;

    @Prop()
    LevelOfEducation: string;

    @Prop()
    LevelOfExperience: string;

    @Prop({ type: [String], required: true })
    languages: string[];

    @Prop({ type: [String], required: true })
    Jobs: string[];

   
    @Prop({ type: [String], required: true })
    JobCategorie: string[];

    @Prop()
    Address: string;

    @Prop()
    Region: string;

    @Prop()
    City: string;

    @Prop({ type: [String], required: true })
    mobility:string[];

    @Prop()
    date:Date;
    @Prop()
    dateFin: Date

    @Prop()
    responable:string;
    @Prop()
    emailforsendmails:string;

    @Prop()
    isAccepted: boolean = false;
    
}

export const OfferInfoSchema = SchemaFactory.createForClass(OfferInfo);