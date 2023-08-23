import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { Mongoose } from 'mongoose';
import { AdditionalInfoModule } from './additional-info/additional-info.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LangueModule } from './langue/langue.module';
import { PersonalDataModule } from './personal-data/personal-data.module';
import { ProfessionalDataModule } from './professional-data/professional-data.module';
import { ProfessionalExperienceModule } from './professional-experience/professional-experience.module';
import { TrainingsQualificationsModule } from './trainings-qualifications/trainings-qualifications.module';
import { SkillsModule } from './skills/skills.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    PersonalDataModule,
    MongooseModule.forRoot(process.env.DB_URI),
    ProfessionalDataModule,
    ProfessionalExperienceModule,
    TrainingsQualificationsModule,
    LangueModule,
    AdditionalInfoModule,
    SkillsModule,
    ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
