import { Categorie, CategorieSchema } from './schemas/Categorie.schema';
/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { CategorieService } from './categorie.service';
import { CategorieController } from './categorie.controller';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
    imports: [MongooseModule.forFeature([{
      name: 'Categorie',
      schema: CategorieSchema,
      // eslint-disable-next-line prettier/prettier
      collection: 'Categorie'
    }]), 
  ],
  controllers: [CategorieController],
  providers: [CategorieService],
})
export class CategorieModule {}
