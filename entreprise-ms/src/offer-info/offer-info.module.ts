import { Module } from '@nestjs/common';
import { OfferInfoService } from './offer-info.service';
import { OfferInfoController } from './offer-info.controller';
import { OfferInfoSchema } from './schemas/offer-info.schema';
import { MongooseModule } from '@nestjs/mongoose';


@Module({
  imports:[MongooseModule.forFeature([{name : 'OfferInfo', schema: OfferInfoSchema}])],
  providers: [OfferInfoService],
  controllers: [OfferInfoController]
})
export class OfferInfoModule {}
