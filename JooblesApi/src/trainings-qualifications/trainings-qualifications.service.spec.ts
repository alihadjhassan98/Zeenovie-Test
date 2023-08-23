import { Test, TestingModule } from '@nestjs/testing';
import { TrainingsQualificationsService } from './trainings-qualifications.service';

describe('TrainingsQualificationsService', () => {
  let service: TrainingsQualificationsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TrainingsQualificationsService],
    }).compile();

    service = module.get<TrainingsQualificationsService>(TrainingsQualificationsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
