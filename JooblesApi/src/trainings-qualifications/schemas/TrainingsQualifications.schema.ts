import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { IsNotEmpty, IsNumber, IsOptional, IsString, Max, Min } from 'class-validator';
import { ObjectId } from "mongoose";

@Schema({
    timestamps: true
})
export class TrainingsQualifications {


    

    @Prop()
    IdUser: string;

    @Prop()
    @IsNotEmpty()
    @IsString()
    typeOfDegree: string;

    @Prop()
    @IsNotEmpty()
    @IsString()
    degreeObtained: string;

    @Prop()
    @IsNotEmpty()
    @IsString()
    period: string;

    @Prop()
    @IsNotEmpty()
    periodStart: Date;

    @Prop()
    @IsNotEmpty()
    periodEnd: Date;

    @Prop()
    @IsNotEmpty()
    @IsString()
    country: string;

    @Prop()
    @IsNotEmpty()
    @IsString()
    institution: string;

    @Prop()
    @IsNotEmpty()
    @IsString()
    status: string;

    @Prop()
    @IsOptional()
    @IsNumber()
    @Min(0)
    @Max(4)
    grade: number;

    @Prop()
    @IsOptional()
    @IsString()
    description: string;
}
export const TrainingsQualificationsSchema = SchemaFactory.createForClass(TrainingsQualifications);


