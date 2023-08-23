import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { Payload } from '@nestjs/microservices';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { ProfessionalData } from './schemas/professional-data.schemas';


@Injectable()
export class ProfessionalDataService {
    constructor(@InjectModel(ProfessionalData.name)
    private proModel: mongoose.Model<ProfessionalData>) { }

    async findAll(): Promise<ProfessionalData[]> {
        const prodata = await this.proModel.find();
        return prodata;
    }

    async create(professionalData: ProfessionalData): Promise<ProfessionalData> {
        const res = await this.proModel.create(professionalData);
        return res;
    }

    async findProfessionalDataByIdUser(userId): Promise<ProfessionalData> {
        const ProData = await this.proModel.findOne({ IdUser: userId }).exec();
        return ProData;
    }
    async findAllProfessionalDataByUser(IdUser: string): Promise<ProfessionalData[]> {
        const prodata = await this.proModel.find({ IdUser });
        return prodata;
      }
    async updateByUserId(userId: string, prodata: ProfessionalData): Promise<ProfessionalData> {
        const updatedData = await this.proModel.findOneAndUpdate({ IdUser: userId }, { $set: prodata }, { new: true, uniqueIdentifier: true, });
        return updatedData;
    }

    async DeleteById(userId: string): Promise<ProfessionalData> {
        return await this.proModel.findOneAndDelete({ IdUser: userId }).exec();
    }
}
