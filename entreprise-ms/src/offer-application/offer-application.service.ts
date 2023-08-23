import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { OfferInfo } from 'src/offer-info/schemas/offer-info.schema';
import { OfferApplication } from './dto/offer-application.dto';
import { OfferInfoService } from 'src/offer-info/offer-info.service';

@Injectable()
export class OfferApplicationService {

  constructor(@InjectModel(OfferApplication.name)
  private offerapplicationModel: mongoose.Model<OfferApplication>,
    @InjectModel(OfferInfo.name)
    private offerInfoModel: mongoose.Model<OfferInfo>,
    private offerInfoService: OfferInfoService) { }


  async createApplication(data): Promise<OfferApplication> {
    const results = await this.offerapplicationModel.create(data);
    return results;
  }

  async getAppliedOffersByConsultantId(consultantId: string): Promise<OfferInfo[]> {
    const offerApplications = await this.offerapplicationModel.find({ consultantId: consultantId }).exec();
    const offerIds = offerApplications.map(application => application.offerId);
    const offers = await this.offerInfoService.getOffersByIds(offerIds);
    return offers;
  }


  async getOfferApplicationsByConsultantId(consultantId: string,): Promise<OfferApplication[]> {
    return this.offerapplicationModel.find({ consultantId: consultantId }).exec();
  }
  // new 
  async getOfferApplicationsByOffreID(Id: string,): Promise<OfferApplication[]> {
    return this.offerapplicationModel.find({ offerId: Id });
  }

  // new 
  
  async updateOfferApplication(offerApplicationId: string, updateData: OfferApplication): Promise<OfferApplication> {
    return this.offerapplicationModel.findByIdAndUpdate(offerApplicationId, updateData, { new: true }).exec();
  }
  async getAllofferApplications(): Promise<any>{
    return  this.offerapplicationModel.find({}); 
  }

  async getOfferApplicationsByEntrepriseId(entrepriseID: string): Promise<OfferApplication[]> {
    return this.offerapplicationModel.find({ entrepriseId: entrepriseID }).exec();
  }
  // TODO: stats entreprise counts
  async getAppliByIdAndPending(entrepriseID: string): Promise<number> {
    return await this.offerapplicationModel.countDocuments({ entrepriseId: entrepriseID, status:"Pending" }).exec();
  }
  async getAppliByIdAndApproved(entrepriseID: string): Promise<number> {
    return await this.offerapplicationModel.countDocuments({ entrepriseId: entrepriseID, status:"Approved" }).exec();
  }
  async getAppliByIdAndRejected(entrepriseID: string): Promise<number> {
    return await this.offerapplicationModel.countDocuments({ entrepriseId: entrepriseID, status:"Rejected" });
  }
  async getAppliByIdAndHired(entrepriseID: string): Promise<number> {
    return await this.offerapplicationModel.countDocuments({ entrepriseId: entrepriseID, status:"Hired" });
  }


  // TODO: stats counts consultants
  async getAppliByIdconsultantAndPending(consultantId: string): Promise<number> {
    return await this.offerapplicationModel.countDocuments({ consultantId: consultantId, status:"Pending" }).exec();
  }
  async getAppliByIdconsultantAndApproved(consultantId: string): Promise<number> {
    return await this.offerapplicationModel.countDocuments({ consultantId: consultantId, status:"Approved" }).exec();
  }
  async getAppliByIdconsultantAndRejected(consultantId: string): Promise<number> {
    return await this.offerapplicationModel.countDocuments({ consultantId: consultantId, status:"Rejected" });
  }
  async getAppliByIdconsultantAndHired(consultantId: string): Promise<number> {
    return await this.offerapplicationModel.countDocuments({ consultantId: consultantId, status:"Hired" });
  }

 

}
