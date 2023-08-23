import { Module } from '@nestjs/common';
import { OfferApplicationController } from './offer-application.controller';
import { OfferApplicationService } from './offer-application.service';
import { OfferApplicationSchema } from './dto/offer-application.dto';
import { MongooseModule } from '@nestjs/mongoose';
import { OfferInfoSchema } from 'src/offer-info/schemas/offer-info.schema';
import { OfferInfoService } from 'src/offer-info/offer-info.service';

@Module({
  imports:[MongooseModule.forFeature([{name : 'OfferApplication', schema: OfferApplicationSchema},{name : 'OfferInfo', schema: OfferInfoSchema}])],
  controllers: [OfferApplicationController],
  providers: [OfferApplicationService,OfferInfoService]
})
export class OfferApplicationModule {}
