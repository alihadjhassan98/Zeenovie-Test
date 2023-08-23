import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ProfileEntrepriseModule } from './profile-entreprise/profile-entreprise.module';
import { OfferInfoModule } from './offer-info/offer-info.module';
import { OfferApplicationModule } from './offer-application/offer-application.module';
import { CommentsModule } from './feedback/comments/comments.module';
import { RatingController } from './feedback/rating/rating.controller';
import { RatingModule } from './feedback/rating/rating.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.DB_URI),
    ProfileEntrepriseModule,
    OfferInfoModule,
    OfferApplicationModule,
    CommentsModule,
    RatingModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
