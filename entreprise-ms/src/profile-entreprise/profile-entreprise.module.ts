import { Module } from '@nestjs/common';
import { ProfileEntrepriseService } from './profile-entreprise.service';
import { ProfileEntrepriseController } from './profile-entreprise.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { EntrepriseSchema } from './schemas/entreprise.schema';

@Module({
  imports:[MongooseModule.forFeature([{name : 'Entreprise', schema: EntrepriseSchema}])],
  providers: [ProfileEntrepriseService],
  controllers: [ProfileEntrepriseController]
})
export class ProfileEntrepriseModule {}
