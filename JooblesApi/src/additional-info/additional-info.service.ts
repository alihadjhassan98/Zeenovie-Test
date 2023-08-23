
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { AdditionalInfo, AdditionalInfoDocument } from './schemas/additionalData.schema';


@Injectable()
export class AdditionalInfoService {
  constructor(
    @InjectModel(AdditionalInfo.name) private additionalInfoModel: Model<AdditionalInfoDocument>,

  ) { }


  async findAll(): Promise<AdditionalInfo[]> {
    const results = this.additionalInfoModel.find();
    return results;
}
async create(data: AdditionalInfo): Promise<AdditionalInfo> {
    const results = await this.additionalInfoModel.create(data);
    return results;
}
async findAdditionalInfoByIdUser(userId): Promise<AdditionalInfo> {
    const ProData = await this.additionalInfoModel.findOne({ IdUser: userId }).exec();
    return ProData;
}

async UpdateAdditionalInfoByIdUser(userId: string, data: AdditionalInfo) {
    const updatedData = await this.additionalInfoModel.findOneAndUpdate(
        { IdUser: userId },
        { $set: data },
        { new: true }
    );
    return updatedData;
}
async deleteAdditionalInfoByIdUser(userId: string): Promise<AdditionalInfo> {
    const results = await this.additionalInfoModel.findOneAndDelete({ IdUser: userId }).exec();
    return results;
}
async updateAdditionalInfoById(id: string, updateAdditionalDataDto: AdditionalInfo): Promise<AdditionalInfo> {
    const data = await this.additionalInfoModel.findByIdAndUpdate(id, updateAdditionalDataDto, { new: true });
    return data;
}





async removeAdditionalInfoById(id: string): Promise<AdditionalInfo> {
    const results = await this.additionalInfoModel.findOneAndDelete({ _id: id }).exec();
    return results;
}

async findAllAdditionalInfoByIdUser(userId: string): Promise<AdditionalInfo[]> {
    const trainQualData = await this.additionalInfoModel.find({ IdUser: userId }).exec();
    return trainQualData;
}
  
}
