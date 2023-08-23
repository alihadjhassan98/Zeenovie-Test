/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';

import { MongooseModule } from '@nestjs/mongoose';
import { QuizSchema } from './quiz.model';
import { QuizService } from 'src/services/quiz.service';
import { QuizController } from 'src/controllers/quiz.controller';
import { ReportSchema } from './report.model';
import { ReportController } from 'src/controllers/report.controller';
import { ReportService } from 'src/services/report.service';

@Module({
    imports: [MongooseModule.forFeature([{
      name: 'Report',
      schema: ReportSchema ,
      // eslint-disable-next-line prettier/prettier
      collection: 'Report'
    }]), 
  ],
  controllers: [ReportController],
  providers: [ReportService],
})
export class ReportModule {}
