import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { Entreprise } from './schemas/entreprise.schema';

@Injectable()
export class ProfileEntrepriseService {

  constructor(
    @InjectModel(Entreprise.name)
    private entrepriseModel: mongoose.Model<Entreprise>
  ) { }

  async findAll(): Promise<Entreprise[]> {
    return this.entrepriseModel.find().exec();
  }
  
  async findAllProfilesByUser(IdUser: string): Promise<Entreprise[]> {
    const per = await this.entrepriseModel.find({ IdUser });
    return per;
  }
  async findAllbyUserid(UserId: string): Promise<Entreprise> {
    const per = await this.entrepriseModel.findOne({ IdUser: UserId });
    return per;
  }
  async loadEntreprisesByUserIds(userIds: string[]): Promise<Entreprise[]> {
    return await this.entrepriseModel.find({ IdUser: { $in: userIds } }).exec();
  }
  

  async create(entreprise: Entreprise): Promise<Entreprise> {
    const createdEntreprise = new this.entrepriseModel(entreprise);
    return createdEntreprise.save();
  }
  async findbyUserid(UserId: string): Promise<Entreprise> {
    const per = await this.entrepriseModel.findOne({ IdUser: UserId });
    return per;
  }


  async Updatebyid(userId: string, data: Entreprise): Promise<Entreprise> {
    return await this.entrepriseModel.findOneAndUpdate(
      { IdUser: userId },
      { $set: data },
      { new: true }
    );

  }

  async Deleteyid(userId: string): Promise<Entreprise> {
    return await this.entrepriseModel.findOneAndDelete({ IdUser: userId }).exec();

  }

}
