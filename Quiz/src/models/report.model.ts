// report.model.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ReportDocument = Report & Document;

@Schema()
export class Report {
  @Prop({ required: true })
  userId: string;

  @Prop({ required: true })
  username: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  quizId: string;

  @Prop({ required: true })
  quizTitle: string;

  @Prop({ required: true })
  quizDescription: string;

  @Prop({ required: true })
  totalQuestions: number;

  @Prop({ required: true })
  correctAnswersCount: number;

  @Prop({ required: true })
  totalScore: number;

  @Prop({ type: [{ type: Object }] })
  questionResponses: QuestionResponse[];

  @Prop({ required: true, type: Date })
  quizStartTime: Date;

  @Prop({ required: true, type: Date })
  quizEndTime: Date;

  @Prop({ required: true })
  CompanyId: string;
}

@Schema()
export class QuestionResponse {
  @Prop({ required: true })
  questionId: string;

  @Prop({ required: true })
  questionText: string;

  @Prop({ type: [{ type: String }] })
  selectedOptions: string[];

  @Prop({ type: [{ type: String }] })
  correctOptions: string[];

  @Prop({ required: true })
  isCorrect: boolean;
}


export const ReportSchema = SchemaFactory.createForClass(Report);
