import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { CreatePersonalDataDto } from './dto/create-personal.dto';
import { UpdatePersonalDataDto } from './dto/update-personal.dto';
import { PersonalDataService } from './personal-data.service';
import { PersonalData } from './schemas/personal-data.schema';

@Controller('Personal-Data')
export class PersonalDataController {
    constructor(private personalservices: PersonalDataService) { }

    @MessagePattern('getAllPersonalData')
    async getAllProfessionalData(): Promise<PersonalData[]> {
        return this.personalservices.findAll();
    }

    @MessagePattern('createPersonalData')
    async createPersonalData(PersonalData: CreatePersonalDataDto): Promise<PersonalData> {
        return this.personalservices.create(PersonalData);
    }

    @MessagePattern('getPersonalDataById')
    async getPersonalDataById(UserId: string): Promise<PersonalData> {
        return this.personalservices.findbyUserid(UserId);
    }

    @MessagePattern('updatePersonalData')
    async updatePersonalData(@Body() data: { id: string, personalDataDTO: UpdatePersonalDataDto }): Promise<PersonalData> {
        console.log("datd is equal too   ", data.personalDataDTO)
        return this.personalservices.Updatebyid(data.personalDataDTO.IdUser, data.personalDataDTO);
    }


    @MessagePattern('deletePersonalData')
    async DeletePersonalDataById(id: string): Promise<PersonalData> {
        return this.personalservices.Deleteyid(id);
    }
}
