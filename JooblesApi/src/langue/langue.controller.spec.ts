import { Test, TestingModule } from '@nestjs/testing';
import { LangueController } from './langue.controller';

describe('LangueController', () => {
  let controller: LangueController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LangueController],
    }).compile();

    controller = module.get<LangueController>(LangueController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
