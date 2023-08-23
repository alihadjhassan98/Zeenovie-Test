import { Module } from '@nestjs/common';
import { ProfessionalExperienceService } from './professional-experience.service';
import { ProfessionalExperienceController } from './professional-experience.controller';
import { ProfessionalExperience, ProfessionalExperienceSchema } from './schemas/Professional-Experience.schemas';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports:[MongooseModule.forFeature([{name : 'ProfessionalExperience', schema: ProfessionalExperienceSchema}])],

  providers: [ProfessionalExperienceService],
  controllers: [ProfessionalExperienceController]
})
export class ProfessionalExperienceModule {}
