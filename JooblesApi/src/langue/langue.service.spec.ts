import { Test, TestingModule } from '@nestjs/testing';
import { LangueService } from './langue.service';

describe('LangueService', () => {
  let service: LangueService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LangueService],
    }).compile();

    service = module.get<LangueService>(LangueService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
