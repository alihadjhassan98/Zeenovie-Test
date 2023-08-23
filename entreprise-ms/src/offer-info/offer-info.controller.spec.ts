import { Test, TestingModule } from '@nestjs/testing';
import { OfferInfoController } from './offer-info.controller';

describe('OfferInfoController', () => {
  let controller: OfferInfoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OfferInfoController],
    }).compile();

    controller = module.get<OfferInfoController>(OfferInfoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
