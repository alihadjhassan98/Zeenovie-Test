import { AdditionalInfoDocument } from './../../additional-info/schemas/additionalData.schema';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
 
@Schema({
  timestamps: true
})
export class ProfessionalExperience  {
  
  @Prop()
  IdUser: string;
  
  @Prop({ required: false })
  CurrentJob: boolean;
 
  @Prop({ required: false, type: Date })
  Period: Date;
 
  @Prop({ required: false, type: Date })
  Until: Date;
 
  @Prop({ required: false })
  JobTitle: string;
 
  @Prop({ required: false })
  JobType: string;
 
  @Prop({ required: false })
  Employer: string;
 
  @Prop({ required: false })
  Workplace: string;
 
  @Prop({ required: false })
  Industry: string;
 
  @Prop({ required: false })
  CompanySize: string;
 
  @Prop({ required: false })
  CompanyCategory: string;
 
  @Prop({ required: false })
  ManagementPosition: boolean;
 
  @Prop({ required: false })
  MonthlyNetSalary: string;
 
  @Prop({ required: false })
  TasksAndMissions: string;
}

export const ProfessionalExperienceSchema = SchemaFactory.createForClass(ProfessionalExperience);