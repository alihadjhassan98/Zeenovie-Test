/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';

import { MongooseModule } from '@nestjs/mongoose';
import { Question, QuestionsSchema } from './questions.model';
import { QuestionsService } from 'src/services/questions.service';
import { QuestionsController } from 'src/controllers/questions.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Question.name, schema: QuestionsSchema }]), // Provide the QuestionModel here
  ],
  controllers: [QuestionsController],
  providers: [QuestionsService],
})
export class QuestionsModule {}