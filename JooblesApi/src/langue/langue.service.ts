import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Langue } from './schemas/langue.schema';


@Injectable()
export class LangueService {
    constructor(
        @InjectModel(Langue.name) private langueModel: Model<Langue>,
    ) { }

    async create(langue: Langue): Promise<Langue> {
        const createdLangue = new this.langueModel(langue);
        return createdLangue.save();
    }

    async findAll(): Promise<Langue[]> {
        return this.langueModel.find().exec();
    }

    async findLanguagesByIdUser(userId): Promise<Langue> {
        const ProData = await this.langueModel.findOne({ IdUser: userId }).exec();
        return ProData;
    }

    async updatelangueByUserID(userId: string, data: Langue) {
        console.log(`Updating skills for user ${userId} with data:`, data);
            const updatedData = await this.langueModel.findOneAndUpdate(
          { IdUser: userId },
          { $set: data },
          { new: true }
        );
        return updatedData;
       
 }

    async DeleteLangueByIdUser(userId: string): Promise<Langue> {
        return await this.langueModel.findOneAndDelete({ IdUser: userId }).exec();
    }

    async updateLangueById(id: string, languedto: Langue): Promise<Langue> {
        const data = await this.langueModel.findByIdAndUpdate(id, languedto, { new: true });
        return data;
    }

    async removeLangueById(id: string): Promise<Langue> {
        const results = await this.langueModel.findOneAndDelete({ _id: id }).exec();
        return results;
    }

    async findAllLangueByIdUser(userId: string): Promise<Langue[]> {
        const trainQualData = await this.langueModel.find({ IdUser: userId }).exec();
        return trainQualData;
    }

    
}
