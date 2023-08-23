import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { UpdateProfessionalExperienceDto } from './dto/update-ProfessionalExperience.dto';
import { ProfessionalExperience, ProfessionalExperienceSchema } from './schemas/Professional-Experience.schemas';

@Injectable()
export class ProfessionalExperienceService {
    constructor(@InjectModel(ProfessionalExperience.name)
    private expModel: mongoose.Model<ProfessionalExperience>) { }

    async findAll(): Promise<ProfessionalExperience[]> {
        const results = this.expModel.find();
        return results;
    }
    async create(data: ProfessionalExperience): Promise<ProfessionalExperience> {
        const results = await this.expModel.create(data);
        return results;
    }
    async findProExperienceByIdUser(userId): Promise<ProfessionalExperience> {
        const ProData = await this.expModel.findOne({ IdUser: userId }).exec();
        return ProData;
    }

    async UpdateProExperienceByIdUser(userId: string, data: ProfessionalExperience) {
        const updatedData = await this.expModel.findOneAndUpdate(
            { IdUser: userId },
            { $set: data },
            { new: true }
        );
        return updatedData;
    }
    async deleteProExperienceByIdUser(userId: string): Promise<ProfessionalExperience> {
        const results = await this.expModel.findOneAndDelete({ IdUser: userId }).exec();
        return results;
    }
    async updateProExperienceById(id: string, updateAdditionalDataDto: ProfessionalExperience): Promise<ProfessionalExperience> {
        const data = await this.expModel.findByIdAndUpdate(id, updateAdditionalDataDto, { new: true });
        return data;
    }





    async removeProExperienceById(id: string): Promise<ProfessionalExperience> {
        const results = await this.expModel.findOneAndDelete({ _id: id }).exec();
        return results;
    }

    async findAllProExperienceByIdUser(userId: string): Promise<ProfessionalExperience[]> {
        const trainQualData = await this.expModel.find({ IdUser: userId }).exec();
        return trainQualData;
    }

}
