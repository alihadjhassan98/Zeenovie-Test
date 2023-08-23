import { Body, Controller, Delete, Get, HttpException, HttpStatus, NotFoundException, Param, Post, Put } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { PersonalData } from 'src/personal-data/schemas/personal-data.schema';
import { CreateTrainingsQualificationsDto } from './dto/create-TrainingsQualifications.dto';
import { UpdateTrainingsQualificationsDto } from './dto/update-TrainingsQualifications.dto';
import { TrainingsQualifications } from './schemas/TrainingsQualifications.schema';
import { TrainingsQualificationsService } from './trainings-qualifications.service';

@Controller('trainings-qualifications')
export class TrainingsQualificationsController {
    constructor(private trainingsQualificationsService: TrainingsQualificationsService) { }

    @MessagePattern('getAllTrainingsQualificationsData')
    async getAllTrainingsQualificationsData(): Promise<TrainingsQualifications[]> {
        try {
            const data = await this.trainingsQualificationsService.findAll();
            return data;
        } catch (error) {
            throw new HttpException('An error occurred while fetching data', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    @MessagePattern('createTrainingQualifcationsData')
    async createTrainingQualifcationsData(@Body() trainingsQualifications: CreateTrainingsQualificationsDto): Promise<TrainingsQualifications> {
        try {
            const data = await this.trainingsQualificationsService.create(trainingsQualifications);
            return data;
        } catch (error) {
            throw new HttpException('An error occurred while creating data', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @MessagePattern("getTrainingsQualificationsByIUser")
    async getTrainingsQualificationsByIUser(userId: string): Promise<TrainingsQualifications> {
        try {
            return await this.trainingsQualificationsService.findTrainingsQualificationsByIdUser(userId);
        } catch (e) {
            throw new NotFoundException(e.message);
        }
    }


    @MessagePattern("getAllTrainingsQualificationsByIUser")
    async getAllTrainingsQualificationsByIUser(userId: string): Promise<TrainingsQualifications[]> {
        return await this.trainingsQualificationsService.findAllTrainingsQualificationsByIdUser(userId);


    }
    @MessagePattern('updateTrainingsQualificationsById')
    async updateTrainingQualification(@Body() data: { id: string, updateDataDto: UpdateTrainingsQualificationsDto }): Promise<TrainingsQualifications> {
        const { id, updateDataDto } = data;
        const updatedData = await this.trainingsQualificationsService.updaterainingsQualificationsById(id, updateDataDto);
        return updatedData;
    }
    @MessagePattern('deleteTrainingQualificationsDataById')
    async DeleteTrainingQualificationsDataById(id: string): Promise<TrainingsQualifications> {
        return this.trainingsQualificationsService.removeTrainingsQualificationsById(id);
    }





    @MessagePattern('updateTrainingQualifcationsDataByIUser')
    async updateTrainingQualifcationsData(@Body() data: { IdUser: string, dataDto: UpdateTrainingsQualificationsDto }): Promise<TrainingsQualifications> {
        //  console.log("update bro ddddd "+ IdUser.toString());
        const updatedData = await this.trainingsQualificationsService.updatetrainingsQualificationsDataByIdUser(data.dataDto.IdUser, data.dataDto);
        // console.log("return data "+updatedData);
        return updatedData;
    }

}

