import { Body, Controller, Get, NotFoundException, Param, Post, Put } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreateProfessionalExperienceDto } from './dto/create-ProfessionalExperience.dto';
import { UpdateProfessionalExperienceDto } from './dto/update-ProfessionalExperience.dto';
import { ProfessionalExperienceService } from './professional-experience.service';
import { ProfessionalExperience } from './schemas/Professional-Experience.schemas';


@Controller()
export class ProfessionalExperienceController {

  constructor(private expService: ProfessionalExperienceService) { }

  @MessagePattern('getAllProExperience')
  async getAllProfessionalData(): Promise<ProfessionalExperience[]> {
    return this.expService.findAll();
  }

  @MessagePattern('createProExperience')
  async addProfessionalExperience(@Body() data: CreateProfessionalExperienceDto): Promise<ProfessionalExperience> {
    return this.expService.create(data);
  }

  @MessagePattern("getProExperienceByUserId")
  async getProfessionalExperienceById(userId): Promise<ProfessionalExperience> {

    const data = this.expService.findProExperienceByIdUser(userId);
    return data;
  }

  @MessagePattern('deleteProExperienceByUserId')
  async deleteProfessional(userId: string): Promise<ProfessionalExperience> {
    return this.expService.deleteProExperienceByIdUser(userId);
  }

  @MessagePattern('updateProExperienceByUserId')
  // @Put('updateProExperienceByUserId/:IdUser')
  async updateProfessionalExperienceByUserId(@Body() data: { IdUser: string, dataDto: UpdateProfessionalExperienceDto }): Promise<ProfessionalExperience> {
    //  console.log("update bro ddddd "+ IdUser.toString());
    const updatedData = await this.expService.UpdateProExperienceByIdUser(data.dataDto.IdUser, data.dataDto);
    // console.log("return data "+updatedData);
    return updatedData;
  }

  @MessagePattern("findAllProExperienceByIdUser")
  async getAllTrainingsQualificationsByIUser(userId: string): Promise<ProfessionalExperience[]> {
    try {
      return await this.expService.findAllProExperienceByIdUser(userId);
    } catch (e) {
      throw new NotFoundException(e.message);
    }
  }
  @MessagePattern('updateProExpById')
  async updateTrainingQualification(@Body() data: { id: string, updateDataDto: UpdateProfessionalExperienceDto }): Promise<ProfessionalExperience> {
    console.log('Pro Experience Microservice: Received Data:', data);
  
    const { id, updateDataDto } = data;
    const updatedData = await this.expService.updateProExperienceById(id, updateDataDto);
  
    console.log('Pro Experience Microservice: Updated Data:', updatedData);
    return updatedData;
  }
  
  @MessagePattern('removeProExperienceById')
  async DeleteTrainingQualificationsDataById(id: string): Promise<ProfessionalExperience> {
    return this.expService.removeProExperienceById(id);
  }
}
