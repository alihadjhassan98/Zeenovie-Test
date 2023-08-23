import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ClientProxyFactory, ClientsModule, Transport } from '@nestjs/microservices';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { AuthGuard } from './guards/auth.guard';
import { RoleGuard } from './guards/role.guard';
import { CategorieModule } from './categorie/categorie.module';
import { ProfessionalDataModule } from './cv_data/professional-data/professional-data.module';
import { LanguagesModule } from './cv_data/languages/languages.module';
import { ProfessionalExperienceModule } from './cv_data/professional-experience/professional-experience.module';
import { TrainingsQualificationsModule } from './cv_data/trainings-qualifications/trainings-qualifications.module';
import { AdditionalDataModule } from './cv_data/additional-data/additional-data.module';
import { ImagesModule } from './upload_ms/images/images.module';
import { FilesModule } from './upload_ms/files/files.module';
import { SkillsModule } from './cv_data/skills/skills.module';
import { PersonalDataModule } from './cv_data/personal-data/personal-data.module';
import { TagsModule } from './tags/tags.module';
import { CorsMiddleware } from './cors.middleware';
import { ProfileModule } from './entreprise/profile/profile.module';
import { OfferModule } from './offer/offer.module';
import { OfferApplicationModule } from './offer-application/offer-application.module';
import { RatingModule } from './feedback/rating/rating.module';
import { CommentsController } from './feedback/comments/comments.controller';
import { CommentsModule } from './feedback/comments/comments.module';
import { OfferRecommandationModule } from './offer-recommandation/offer-recommandation.module';
import { QuizModule } from './Quiz/quiz.module';
import { QuestionsModule } from './Questions/Questions.module';






@Module({


  imports: [
    ConfigModule.forRoot(),
    AuthModule,
    CategorieModule,
    ClientsModule.register([
      { 
      name: 'AUTH_SERVICE', 
      transport: Transport.TCP,
      options:{ 
        host: "0.0.0.0",
        port: 3010//parseInt(process.env.AUTHMCPORT),
      },

  
    },
   
  
    ]),


    ProfessionalDataModule,
    LanguagesModule,
    ProfessionalExperienceModule,
    TrainingsQualificationsModule,
    AdditionalDataModule,
    ImagesModule,
    FilesModule,
    SkillsModule,
    PersonalDataModule,
    TagsModule,
    ProfileModule,
    OfferModule,
    OfferApplicationModule,
    RatingModule,
    CommentsModule,
    OfferRecommandationModule,
    QuizModule,
    QuestionsModule,
    
  ],
  controllers: [AppController],
  providers: [
    AppService,
    AuthGuard,
    RoleGuard,


],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(CorsMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
