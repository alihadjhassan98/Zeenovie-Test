import { Test, TestingModule } from '@nestjs/testing';
import { AdditionalInfoController } from './additional-info.controller';

describe('AdditionalInfoController', () => {
  let controller: AdditionalInfoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AdditionalInfoController],
    }).compile();

    controller = module.get<AdditionalInfoController>(AdditionalInfoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
