import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { QuestionsController } from './controllers/questions.controller';
import { QuestionsService } from './services/questions.service';
import { Question, QuestionsSchema } from './models/questions.model';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { QuestionsModule } from './models/categorie.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGODB_URI),
    MongooseModule.forFeature([{ name: Question.name, schema: QuestionsSchema }]),
    HttpModule,
    QuestionsModule,

  ],
  controllers: [QuestionsController],
  providers: [QuestionsService],
})
export class AppModule {}
