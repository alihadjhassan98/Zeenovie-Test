import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type QuizDocument = Quiz & Document;

@Schema()
export class Quiz {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop({ type: [{ type: Object }] })
  questions: Question[];

  @Prop({ type: [{ type: String }] })
  assignedTo: string[]; // Candidate IDs

  @Prop({ required: true, type: String }) // Add this line to include IdUser property
  IdUser: string; // ID of the user who created the quiz

  @Prop({ required: true, type: Number, default: 0 })
  timer: number; // Timer in minutes (default: 0)

  // Add any other properties or methods as needed
}


@Schema()
export class Question {
  @Prop()
  text: string;

  @Prop()
  type: 'single-choice' | 'multiple-choice';

  @Prop({ type: [{ text: String, isCorrect: Boolean }] }) // Embedding the options directly in the Question schema
  options: { text: string; isCorrect: boolean }[];

  @Prop({ type: String, enum: ['easy', 'medium', 'hard', 'extreme'] })
  difficulty: string;
}

export const QuizSchema = SchemaFactory.createForClass(Quiz);
