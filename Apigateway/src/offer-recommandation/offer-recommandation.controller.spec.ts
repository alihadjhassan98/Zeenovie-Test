import { Test, TestingModule } from '@nestjs/testing';
import { OfferRecommandationController } from './offer-recommandation.controller';

describe('OfferRecommandationController', () => {
  let controller: OfferRecommandationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OfferRecommandationController],
    }).compile();

    controller = module.get<OfferRecommandationController>(OfferRecommandationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
