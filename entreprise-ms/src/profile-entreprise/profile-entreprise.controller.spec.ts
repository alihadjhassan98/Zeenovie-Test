import { Test, TestingModule } from '@nestjs/testing';
import { ProfileEntrepriseController } from './profile-entreprise.controller';

describe('ProfileEntrepriseController', () => {
  let controller: ProfileEntrepriseController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProfileEntrepriseController],
    }).compile();

    controller = module.get<ProfileEntrepriseController>(ProfileEntrepriseController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
