import { Test, TestingModule } from '@nestjs/testing';
import { OfferApplicationService } from './offer-application.service';

describe('OfferApplicationService', () => {
  let service: OfferApplicationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OfferApplicationService],
    }).compile();

    service = module.get<OfferApplicationService>(OfferApplicationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
