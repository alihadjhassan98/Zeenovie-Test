import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { QuizController } from './controllers/quiz.controller';
import { QuizService } from './services/quiz.service';
import { Quiz, QuizSchema } from './models/quiz.model';
import { ReportController } from './controllers/report.controller'; // Import the ReportController
import { ReportService } from './services/report.service'; // Import the ReportService
import { Report, ReportSchema } from './models/report.model'; // Import the Report schema
import { QuizModule } from './models/categorie.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGODB_URI),
    MongooseModule.forFeature([{ name: Quiz.name, schema: QuizSchema }]),
    MongooseModule.forFeature([{ name: Report.name, schema: ReportSchema }]), // Add Report schema
    HttpModule,
    QuizModule,
  ],
  controllers: [QuizController, ReportController], // Add ReportController
  providers: [QuizService, ReportService], // Add ReportService
})
export class AppModule {}
