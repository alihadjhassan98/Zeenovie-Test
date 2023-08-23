import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { UpdateSkillDto } from './dto/update-skill.dto';
import { Skills } from './entities/skill.entity';

@Injectable()
export class SkillsService {
  
  constructor(
    @InjectModel(Skills.name) 
    private skillrepo : mongoose.Model<Skills>
  ){}


  async findAll(): Promise<Skills[]> {
    const res = await this.skillrepo.find();
    return res;
  }

 async create(data: Skills): Promise<Skills> {
    const res = await this.skillrepo.create(data);
    return res;
  }
  async findOneKillsByUserId(userId: string) {
    const res = await this.skillrepo.findOne({ IdUser: userId }).exec();
    if (!userId){
      throw new NotFoundException ("skils not found for user id: " + userId);
    }
    return res;
  }

  async updateSkillsByUserID(userId: string, data: Skills) {
 
        const updatedData = await this.skillrepo.findOneAndUpdate(
      { IdUser: userId },
      { $set: data },
      { new: true , upsert: true}
    );
    return updatedData;
   }

 async remove(userId: string): Promise<Skills> {
    return this.skillrepo.findOneAndDelete({ IdUser: userId }).exec();
  }


  
  async updateSkillsById(id: string, updateAdditionalDataDto: UpdateSkillDto): Promise<Skills> {

    const data = await this.skillrepo.findByIdAndUpdate(id, updateAdditionalDataDto, { new: true, uniqueIdentifier: true });
    return data;
}

async removeSkillsById(id: string): Promise<Skills> {
    const results = await this.skillrepo.findOneAndDelete({ _id: id }).exec();
    return results;
}

async findAllSkillsByIdUser(userId: string): Promise<Skills[]> {
    const foudtrainQualData = await this.skillrepo.find({ IdUser: userId }).exec();
    if (!foudtrainQualData) {
        throw new NotFoundException(`This Skills data with ID "${userId}" not found`);
    }
    return foudtrainQualData;
}
  
}
