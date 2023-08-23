import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LangueController } from './langue.controller';
import { LangueService } from './langue.service';
import { Langue, LangueDataschema } from './schemas/langue.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Langue', schema: LangueDataschema }])],
  controllers: [LangueController],
  providers: [LangueService]
})
export class LangueModule { }
