import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Put, Patch } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { NextFunction } from 'express';
import { CreateProfessionalDataDto } from './dto/create-professional.dto';
import { UpdateProfessionalDataDto } from './dto/update-professional.dto';
import { ProfessionalDataService } from './professional-data.service';
import { ProfessionalData } from './schemas/professional-data.schemas';

@Controller('professional-data')
export class ProfessionalDataController {
    constructor(private readonly professionalDataService: ProfessionalDataService) { }

    @MessagePattern('getAllProfessionalData')
    async getAllProfessionalData(): Promise<ProfessionalData[]> {
        return this.professionalDataService.findAll();
    }

    @MessagePattern('createProfessionalData')
    async createProfessional(ProData: CreateProfessionalDataDto): Promise<ProfessionalData> {
        return this.professionalDataService.create(ProData);
    }

    @MessagePattern("getProfessionalDataByIdUser")
    //@Get("getProfessionalDataByIdUser/:IdUser")
    async getProfessionalDataByIdUser(userId) {
        const data = await this.professionalDataService.findProfessionalDataByIdUser(userId);
        return data;
    }

    @MessagePattern('getAllProfessionalDataByUser')
async getAllProfessionalDataByUser({ IdUser }: { IdUser: string }): Promise<ProfessionalData[]> {
  return this.professionalDataService.findAllProfessionalDataByUser(IdUser);
}

    @MessagePattern('updateProfessionalDataByUserId')
    // @Put('updateProfessionalDataByUserId/:IdUser')
    async updateProfessionalDataByUserId(@Body() data: { IdUser: string, professionalDataDTO: UpdateProfessionalDataDto }): Promise<ProfessionalData> {
        const { IdUser, professionalDataDTO } = data;
        const updatedData = await this.professionalDataService.updateByUserId(IdUser, professionalDataDTO);
        return updatedData;
    }t

    @MessagePattern('deleteProfessionalData')
    async deleteProfessional(userId: string): Promise<ProfessionalData> {
        return this.professionalDataService.DeleteById(userId);
    }
}

