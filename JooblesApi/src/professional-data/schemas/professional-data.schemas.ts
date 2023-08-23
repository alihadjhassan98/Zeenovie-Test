import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
@Schema({
    timestamps: true
})

export class ProfessionalData {
    
    @Prop()
    IdUser: string;

    @Prop()
    Title: string;

    @Prop()
    LevelOfEducation: string;

    @Prop()
    LevelOfExperience: string;

    @Prop()
    CurrentNetSalary: number;

    @Prop()
    ProfessionalSituation: string;

    @Prop()
    Availability: string;

    @Prop()
    DesiredMinimumNetSalary: number;

    //tebleau de string 
    @Prop({ type: [String], required: true })
    Jobs: string[];

    //tebleau de string 
    @Prop({ type: [String], required: true })
    JobCategorie: string[];

    //tebleau de string 
    @Prop({ type: [String], required: true })
    SectorsOfActivity: string[];

    //tebleau de string 
    @Prop({ type: [String], required: true })
    TypesOfPositions: string[];

    @Prop()
    Address: string;

    @Prop()
    Region: string;

    @Prop()
    City: string;

    //tebleau de string 
    @Prop({ type: [String], required: true })
    Occupation: string[];

    //tebleau de string 
    @Prop({ type: [String], required: true })
    Mobility: string[];
}
export const ProfessionalDataSchema = SchemaFactory.createForClass(ProfessionalData);
//hello  world