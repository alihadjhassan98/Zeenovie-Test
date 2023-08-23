import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
@Schema({
    timestamps: true
})
export class PersonalData {
    
    @Prop()
    IdUser: string;

    @Prop()
    Name: string;

    @Prop()
    FirstName: string;

    @Prop()
    Gender: string;

    @Prop()
    Dateofbirth: Date;

    @Prop()
    MaritalStatus: string;

    @Prop()
    Country: string;

    @Prop()
    Address: string;

    @Prop()
    Region: string;

    @Prop()
    City: string;

    @Prop({ type: [String] }) // Defines phoneNumber as an array of strings
    phoneNumber: string[];

    @Prop()
    Nationality: string;
    @Prop()
    about:string;

}
export const PersonalDataSchema = SchemaFactory.createForClass(PersonalData)