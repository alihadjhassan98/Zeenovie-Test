import { Injectable } from '@nestjs/common';
import { OfferInfo } from './schemas/offer-info.schema';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { SearchOffersDto } from './dto/SearchOffersDto.dto';

@Injectable()
export class OfferInfoService {

    constructor(@InjectModel(OfferInfo.name)
    private expModel: mongoose.Model<OfferInfo>) { }

    async findAllpagination(page: number, rows: number) {
        const skip = (page - 1) * rows;
        const offers = await this.expModel.find().skip(skip).limit(rows);
        const totalRecords = await this.expModel.countDocuments();
        return { offers, totalRecords };
      }
      
      async findAll(){
        return await this.expModel.find();
      }
   
    
    async create(data: OfferInfo): Promise<OfferInfo> {
        const results = await this.expModel.create(data);
        return results;
    }
    async findOfferInfoByIdUser(userId): Promise<OfferInfo> {
        const ProData = await this.expModel.findOne({ IdUser: userId }).exec();
        return ProData;
    }

    async getOffersByIds(offerIds: string[]): Promise<OfferInfo[]> {
        return this.expModel.find({ _id: { $in: offerIds } }).exec();
      }
      

    async UpdateOfferInfoByIdUser(userId: string, data: OfferInfo) {
        const updatedData = await this.expModel.findOneAndUpdate(
            { IdUser: userId },
            { $set: data },
            { new: true }
        );
        return updatedData;
    }
    async deleteOfferInfoByIdUser(userId: string): Promise<OfferInfo> {
        const results = await this.expModel.findOneAndDelete({ IdUser: userId }).exec();
        return results;
    }
    async updateOfferInfoById(id: string, updateOfferInfoDto: OfferInfo): Promise<OfferInfo> {
        const data = await this.expModel.findByIdAndUpdate(id, updateOfferInfoDto, { new: true });
        return data;
    }


    async findOfferById(id: string): Promise<OfferInfo> {
        const data = await this.expModel.findById(id);
        return data;
    }


    async removeOfferInfo(id: string): Promise<OfferInfo> {
        const results = await this.expModel.findOneAndDelete({ _id: id }).exec();
        return results;
    }

    async findAllOfferInfo(userId: string): Promise<OfferInfo[]> {
        const trainQualData = await this.expModel.find({ IdUser: userId }).exec();
        return trainQualData;
    }

    async searchOffers(searchFilters: SearchOffersDto): Promise<OfferInfo[]> {
        const {
          JobCategorie,
          TypesOfPositions,
          DesiredMinimumNetSalary,
          DesiredMaximumNetSalary,
          in: location,
          LevelOfEducation,
          LevelOfExperience,
          Address,
        } = searchFilters;
    
        const query: any = {};
    
        if (location) {
          query.in = location;
        }
    
     
        if (JobCategorie && JobCategorie.length > 0) {
          query.JobCategorie = { $in: JobCategorie };
        }
    
        if (TypesOfPositions && TypesOfPositions.length > 0) {
          query.TypesOfPositions = { $in: TypesOfPositions };
        }
    
        if (DesiredMinimumNetSalary) {
          query.DesiredMinimumNetSalary = { $gte: DesiredMinimumNetSalary };
        }
    
        if (DesiredMaximumNetSalary) {
          query.DesiredMaximumNetSalary = { $lte: DesiredMaximumNetSalary };
        }
    
        if (LevelOfEducation) {
          query.LevelOfEducation = LevelOfEducation;
        }
    
        if (LevelOfExperience) {
          query.LevelOfExperience = LevelOfExperience;
        }
    
        if (Address) {
          query.Address = Address;
        }
    
        const offers = await this.expModel.find(query).exec();
        return offers;
      }
    }



