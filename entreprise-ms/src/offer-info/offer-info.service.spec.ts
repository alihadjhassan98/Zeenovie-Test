import { Test, TestingModule } from '@nestjs/testing';
import { OfferInfoService } from './offer-info.service';

describe('OfferInfoService', () => {
  let service: OfferInfoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OfferInfoService],
    }).compile();

    service = module.get<OfferInfoService>(OfferInfoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
