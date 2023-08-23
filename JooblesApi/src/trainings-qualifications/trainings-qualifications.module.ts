import { Module } from '@nestjs/common';
import { TrainingsQualificationsService } from './trainings-qualifications.service';
import { TrainingsQualificationsController } from './trainings-qualifications.controller';
import { TrainingsQualificationsSchema } from './schemas/TrainingsQualifications.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports:[MongooseModule.forFeature([{name : 'TrainingsQualifications', schema: TrainingsQualificationsSchema}])],
  providers: [TrainingsQualificationsService],
  controllers: [TrainingsQualificationsController]
})
export class TrainingsQualificationsModule {}
