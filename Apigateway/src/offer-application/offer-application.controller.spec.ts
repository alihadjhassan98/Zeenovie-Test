import { Test, TestingModule } from '@nestjs/testing';
import { OfferApplicationController } from './offer-application.controller';

describe('OfferApplicationController', () => {
  let controller: OfferApplicationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OfferApplicationController],
    }).compile();

    controller = module.get<OfferApplicationController>(OfferApplicationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
