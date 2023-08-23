// question.model.ts

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type QuestionDocument = Question & Document;


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


  @Prop() // Add the categorie field
  categorie: string;
}

export const QuestionsSchema = SchemaFactory.createForClass(Question);
