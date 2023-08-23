import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { PersonalData } from './schemas/personal-data.schema';

@Injectable()
export class PersonalDataService {
    constructor(
        @InjectModel(PersonalData.name)
        private personalModel: mongoose.Model<PersonalData>
    ) { }

    async findAll(): Promise<PersonalData[]> {
        const PersonalDatas = await this.personalModel.find();
        return PersonalDatas;
    }
    async create(personalData: PersonalData): Promise<PersonalData> {
        const res = await this.personalModel.create(personalData);
        return res;
    }
    async findbyUserid(UserId: string): Promise<PersonalData> {
        const per = await this.personalModel.findOne({ IdUser : UserId });
        return per;
    }

    
    async Updatebyid(userId: string, data: PersonalData): Promise<PersonalData> {
        return await this.personalModel.findOneAndUpdate(
            { IdUser: userId },
            { $set: data },
            { new: true }
        );

    }

    async Deleteyid(userId: string): Promise<PersonalData> {
        return await this.personalModel.findOneAndDelete({ IdUser: userId }).exec();

    }
}
