import { Module } from '@nestjs/common';
import { AdditionalInfoService } from './additional-info.service';
import { AdditionalInfoController } from './additional-info.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { AdditionalInfoSchema } from './schemas/additionalData.schema';


@Module({
  imports:[MongooseModule.forFeature([{name : 'AdditionalInfo', schema:AdditionalInfoSchema }])],
  providers: [AdditionalInfoService],
  controllers: [AdditionalInfoController]
})
export class AdditionalInfoModule {}
