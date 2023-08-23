import { CreateAdditionalDataDto } from './dto/create-additionalInfo.dto';
import { UpdateAdditionalDataDto } from './dto/update-additionalinfo.dto';
import { Controller, Get, Post, Body, Put, Param, Delete, HttpException, HttpStatus, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AdditionalInfoService } from './additional-info.service';

import { AdditionalInfo, AdditionalInfoDocument } from './schemas/additionalData.schema';
import { MessagePattern } from '@nestjs/microservices';



@Controller('additional-info')
export class AdditionalInfoController {


  constructor(private readonly additionalInfoService: AdditionalInfoService,
    @InjectModel(AdditionalInfo.name) private readonly additionalInfoModel: Model<AdditionalInfoDocument>,
  ) { }



  @MessagePattern("findAllAdditionalInfoByIdUser")
  async getAllTrainingsQualificationsByIUser(userId: string): Promise<AdditionalInfo[]> {
    try {
      return await this.additionalInfoService.findAllAdditionalInfoByIdUser(userId);
    } catch (e) {
      throw new NotFoundException(e.message);
    }
  }
  @MessagePattern('getAlladditionalInfo')
  async getAllProfessionalData(): Promise<AdditionalInfo[]> {
    return this.additionalInfoService.findAll();
  }

  @MessagePattern('createAdditionalInfo')
  async addProfessionalExperience(@Body() data: CreateAdditionalDataDto): Promise<AdditionalInfo> {
    return this.additionalInfoService.create(data);
  }

  @MessagePattern("getAdditionalInfoByUserId")
  async getProfessionalExperienceById(userId): Promise<AdditionalInfo> {

    const data = this.additionalInfoService.findAdditionalInfoByIdUser(userId);
    return data;
  }

  @MessagePattern('deleteaAdditionalInfoByUserId')
  async deleteAdditionalInfo(userId: string): Promise<AdditionalInfo> {
    return this.additionalInfoService.deleteAdditionalInfoByIdUser(userId);
  }

  @MessagePattern('updateadditionalInfoByUserId')
  // @Put('updateadditionalInfoServiceByUserId/:IdUser')
  async updateAdditionalInfoExperienceByUserId(@Body() data: { IdUser: string, dataDto: UpdateAdditionalDataDto }): Promise<AdditionalInfo> {
    //  console.log("update bro ddddd "+ IdUser.toString());AdditionalInfo
    const updatedData = await this.additionalInfoService.UpdateAdditionalInfoByIdUser(data.dataDto.IdUser, data.dataDto);
    // console.log("return data "+updatedData);
    return updatedData;
  }

  @MessagePattern('updateAdditionalInfoById')
  async updateTrainingQualification(@Body() data: { id: string, updateDataDto: UpdateAdditionalDataDto }): Promise<AdditionalInfo> {
    console.log('AdditionalInfo Microservice: Received Data:', data);

    const { id, updateDataDto } = data;
    const updatedData = await this.additionalInfoService.updateAdditionalInfoById(id, updateDataDto);

    console.log('AdditionalInfo Microservice: Updated Data:', updatedData);
    return updatedData;
  }

  @MessagePattern('removeAdditionalInfoById')
  async DeleteTrainingQualificationsDataById(id: string): Promise<AdditionalInfo> {
    return this.additionalInfoService.removeAdditionalInfoById(id);
  }



}
