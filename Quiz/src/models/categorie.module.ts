/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';

import { MongooseModule } from '@nestjs/mongoose';
import { QuizSchema } from './quiz.model';
import { QuizService } from 'src/services/quiz.service';
import { QuizController } from 'src/controllers/quiz.controller';

@Module({
    imports: [MongooseModule.forFeature([{
      name: 'Quiz',
      schema: QuizSchema ,
      // eslint-disable-next-line prettier/prettier
      collection: 'Quiz'
    }]), 
  ],
  controllers: [QuizController],
  providers: [QuizService],
})
export class QuizModule {}
