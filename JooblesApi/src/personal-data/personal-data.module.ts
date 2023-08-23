import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PersonalDataController } from './personal-data.controller';
import { PersonalDataService } from './personal-data.service';
import { PersonalData, PersonalDataSchema } from './schemas/personal-data.schema';

@Module({
  imports:[MongooseModule.forFeature([{name : 'PersonalData', schema: PersonalDataSchema}])],
  controllers: [PersonalDataController],
  providers: [PersonalDataService]
})
export class PersonalDataModule {}
