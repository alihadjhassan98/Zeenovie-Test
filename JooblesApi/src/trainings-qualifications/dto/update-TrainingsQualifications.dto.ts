import { IsNotEmpty, IsString, IsOptional, IsNumber, Min, Max } from "class-validator";

export interface UpdateTrainingsQualificationsDto {
   readonly IdUser:string;
    readonly typeOfDegree: string;
    readonly degreeObtained: string;
    readonly period: string;
    readonly periodStart: Date;
    readonly periodEnd: Date;
    readonly country: string;
    readonly institution: string;
    readonly status: string;
    readonly grade: number;
    readonly description: string;
}