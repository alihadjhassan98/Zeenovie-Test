import { Test, TestingModule } from '@nestjs/testing';
import { ProfileEntrepriseService } from './profile-entreprise.service';

describe('ProfileEntrepriseService', () => {
  let service: ProfileEntrepriseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProfileEntrepriseService],
    }).compile();

    service = module.get<ProfileEntrepriseService>(ProfileEntrepriseService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
