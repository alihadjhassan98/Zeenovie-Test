import { Module } from '@nestjs/common';
import { SkillsService } from './skills.service';
import { SkillsController } from './skills.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { SkillsSchema } from './entities/skill.entity';

@Module({
   imports:[MongooseModule.forFeature([{name : 'Skills', schema: SkillsSchema }])],
  controllers: [SkillsController],
  providers: [SkillsService]
})
export class SkillsModule {}
