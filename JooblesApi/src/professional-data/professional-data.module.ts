import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProfessionalDataController } from './professional-data.controller';
import { ProfessionalDataService } from './professional-data.service';
import { ProfessionalDataSchema } from './schemas/professional-data.schemas';

@Module({
  imports:[MongooseModule.forFeature([{name : 'ProfessionalData', schema: ProfessionalDataSchema}])],
  controllers: [ProfessionalDataController],
  providers: [ProfessionalDataService]
})
export class ProfessionalDataModule {}
