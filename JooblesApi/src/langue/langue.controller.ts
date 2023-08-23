import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Put } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreateLangueDTO } from './dto/create-langue.dto';
import { UpdateLangueDTO } from './dto/update-langue.dto';
import { LangueService } from './langue.service';
import { Langue } from './schemas/langue.schema';

@Controller('languages')
export class LangueController {
    constructor(private readonly langueService: LangueService) { }

    @MessagePattern('findAllLangues')
    async findAllLangues(): Promise<Langue[]> {
        return this.langueService.findAll();
    }

    @MessagePattern('createLangue')
    async createLangue(ProData: CreateLangueDTO): Promise<Langue> {
        return this.langueService.create(ProData);
    }

    @MessagePattern("findOneLangueByUserId")
    //@Get("findOneLangueByUserId/:IdUser")
    async findOneLangueByUserId(userId) {
        const data = await this.langueService.findLanguagesByIdUser(userId);
        return data;
    }
    @MessagePattern('updateLangueByUserId')
    async updateSkillsByUserId(@Body() data: { IdUser: string, dataDto: UpdateLangueDTO }): Promise<Langue> {
        //  console.log("update bro ddddd "+ IdUser.toString());
        const updatedData = await this.langueService.updatelangueByUserID(data.dataDto.IdUser, data.dataDto);
        // console.log("return data "+updatedData);
        return updatedData;
    }
    @MessagePattern('removeLangueByUserId')
    async removeLangue(userId: string): Promise<Langue> {
        return this.langueService.DeleteLangueByIdUser(userId);
    }



    @MessagePattern("findAllLanguesByIdUser")
    async getAllTrainingsQualificationsByIUser(userId: string): Promise<Langue[]> {
      try {
        return await this.langueService.findAllLangueByIdUser(userId);
      } catch (e) {
        throw new NotFoundException(e.message);
      }
    }



    @MessagePattern('updateLangueById')
    async updateTrainingQualification(@Body() data: { id: string, updateDataDto: UpdateLangueDTO }): Promise<Langue> {
      console.log('Pro Experience Microservice: Received Data:', data);
    
      const { id, updateDataDto } = data;
      const updatedData = await this.langueService.updateLangueById(id, updateDataDto);
    
      console.log('Pro Experience Microservice: Updated Data:', updatedData);
      return updatedData;
    }
    
    @MessagePattern('removeLangueById')
    async DeleteTrainingQualificationsDataById(id: string): Promise<Langue> {
      return this.langueService.removeLangueById(id);
    }





}
