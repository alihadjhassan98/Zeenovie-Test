import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { SkillsService } from './skills.service';
import { CreateSkillDto } from './dto/create-skill.dto';
import { UpdateSkillDto } from './dto/update-skill.dto';
import { Skills } from './entities/skill.entity';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller('skills')
export class SkillsController {
  constructor(private readonly skillsService: SkillsService) { }

  @MessagePattern('getAllSkillsData')
  async findAll(): Promise<Skills[]> {
    // console.log("Loading all skills");
    return this.skillsService.findAll();
  }

  @MessagePattern('CreateSkillData')
  async create(dataDto: CreateSkillDto): Promise<Skills> {
    const data = await this.skillsService.create(dataDto);
    // console.log("this posting -=>>> " + data);
    return data;
  }
  @MessagePattern('updateSkill')
  async updateSkillsByUserId(@Body() data: { IdUser: string, dataDto: UpdateSkillDto }): Promise<Skills> {
    //  console.log("update bro ddddd "+ IdUser.toString());
    const updatedData = await this.skillsService.updateSkillsByUserID(data.dataDto.IdUser, data.dataDto);
    // console.log("return data "+updatedData);
    return updatedData;
  }


  @MessagePattern('deleteSkills')
  async deleteProfessional(userId: string): Promise<Skills> {
    return this.skillsService.remove(userId);
  }

  
  @MessagePattern("findAllSkillsByIdUser")
  async getAllSkillsById(userId: string): Promise<Skills[]> {
      return await this.skillsService.findAllSkillsByIdUser(userId);


  }
  @MessagePattern('updateById')
  async updateSkills(@Body() data: { id: string, updateDataDto: UpdateSkillDto }): Promise<Skills> {
      const { id, updateDataDto } = data;
      const updatedData = await this.skillsService.updateSkillsById(id, updateDataDto);
      return updatedData;
  }
  @MessagePattern('deleteskills')
  async DeleteSkillsById(id: string): Promise<Skills> {
      return this.skillsService.removeSkillsById(id);
  }
}
