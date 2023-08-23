import { Test, TestingModule } from '@nestjs/testing';
import { AdditionalInfoService } from './additional-info.service';

describe('AdditionalInfoService', () => {
  let service: AdditionalInfoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AdditionalInfoService],
    }).compile();

    service = module.get<AdditionalInfoService>(AdditionalInfoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
