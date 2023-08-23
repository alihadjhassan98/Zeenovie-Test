import { UpdateTrainingsQualificationsDto } from './dto/update-TrainingsQualifications.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { TrainingsQualifications } from './schemas/TrainingsQualifications.schema';

@Injectable()
export class TrainingsQualificationsService {
    constructor(
        @InjectModel(TrainingsQualifications.name)
        private trainQualModel: mongoose.Model<TrainingsQualifications>,
    ) { }

    async findAll(): Promise<TrainingsQualifications[]> {
        const trainQualData = await this.trainQualModel.find();
        return trainQualData;
    }

    async create(
        TrainingsQualifications: TrainingsQualifications,
    ): Promise<TrainingsQualifications> {
        const res = await this.trainQualModel.create(TrainingsQualifications);
        return res;
    }


    async findAllTrainingsQualificationsByIdUser(userId: string): Promise<TrainingsQualifications[]> {
        const trainQualData = await this.trainQualModel.find({ IdUser: userId }).exec();
        return trainQualData;
    }


    async updaterainingsQualificationsById(id: string, updateAdditionalDataDto: UpdateTrainingsQualificationsDto): Promise<TrainingsQualifications> {

        const data = await this.trainQualModel.findByIdAndUpdate(id, updateAdditionalDataDto, { new: true, uniqueIdentifier: true });
        return data;
    }
    
    async removeTrainingsQualificationsById(id: string): Promise<TrainingsQualifications> {
        const results = await this.trainQualModel.findOneAndDelete({ _id: id }).exec();
        return results;
    }

    async findTrainingsQualificationsByIdUser(userId: string): Promise<TrainingsQualifications> {
        const foudtrainQualData = await this.trainQualModel.findOne({ IdUser: userId }).exec();
        if (!foudtrainQualData) {
            throw new NotFoundException(`This Trainings and Qualifications data with ID "${userId}" not found`);
        }
        return foudtrainQualData;
    }





    async updatetrainingsQualificationsDataByIdUser(userId: string, data: TrainingsQualifications) {
        console.log(`Updating skills for user ${userId} with data:`, data);
        const updatedtrainingsQualificationsData = await this.trainQualModel.findOneAndUpdate(
            { IdUser: userId },
            { $set: data },
            { new: true }
        );
        return updatedtrainingsQualificationsData;

    }



}
