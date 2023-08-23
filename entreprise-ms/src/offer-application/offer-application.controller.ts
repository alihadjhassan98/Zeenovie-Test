import { Controller } from '@nestjs/common';
import { OfferApplicationService } from './offer-application.service';
import { MessagePattern } from '@nestjs/microservices';
import { OfferInfo } from 'src/offer-info/schemas/offer-info.schema';
import { OfferApplication } from './dto/offer-application.dto';

@Controller('offer-application')
export class OfferApplicationController {


  constructor(private readonly applicationService: OfferApplicationService) { }

  @MessagePattern('applyForOffer')
  async createApplication(data): Promise<any> {
    return this.applicationService.createApplication(data);
  }



  @MessagePattern('getOffersApplicationsByConsultantId')
  async getOfferApplicationsByConsultantId(consultantId: string): Promise<any> {
    return this.applicationService.getOfferApplicationsByConsultantId(
      consultantId,
    );
  }
  @MessagePattern('getAppliedOffersByConsultantId')
  async getAppliedOffersByConsultantId(consultantId: string): Promise<OfferInfo[]> {
    return this.applicationService.getAppliedOffersByConsultantId(consultantId);
  }
  // new
  @MessagePattern('getOffersApplicationsByoffreId')
  async getOfferApplicationsByOffretIdPersonalData(Id: string): Promise<any> {
    return this.applicationService.getOfferApplicationsByOffreID(Id);
  }
  @MessagePattern('updateOfferApplication')
  async updateOfferApplication(data: { offerApplicationId: string, updateData: OfferApplication }): Promise<OfferApplication> {
    const { offerApplicationId, updateData } = data;
    return this.applicationService.updateOfferApplication(offerApplicationId, updateData);
  }

  @MessagePattern('GetAllOfferApplication')
  async GetAllOfferApplication(): Promise<any> {
    return this.applicationService.getAllofferApplications();
  }

  @MessagePattern('getAppliedOffersByentrepriseid')
  async getOfferApplicationsByEntrepriseId(data: { entrepriseID: string }): Promise<OfferApplication[]> {
    return this.applicationService.getOfferApplicationsByEntrepriseId(data.entrepriseID);
  }
  // new stats for entreprise application
  @MessagePattern('getOfferAppliByIdAndPending')
  async getOfferAppliByIdAndPending(data: { entrepriseID: string }): Promise<number> {
    return this.applicationService.getAppliByIdAndPending(data.entrepriseID);
  }
  @MessagePattern('getAppliByIdAndApproved')
  async getOfferAppliByIdAndApproved(data: { entrepriseID: string }): Promise<number> {
    return this.applicationService.getAppliByIdAndApproved(data.entrepriseID);
  }
  @MessagePattern('getAppliByIdAndRejected')
  async getOffergetAppliByIdAndRejected(data: { entrepriseID: string }): Promise<number> {
    return this.applicationService.getAppliByIdAndRejected(data.entrepriseID);
  }
  @MessagePattern('getAppliByIdAndHired')
  async getOffergetAppliByIdAndHired(data: { entrepriseID: string }): Promise<number> {
    return this.applicationService.getAppliByIdAndHired(data.entrepriseID);
  }

  // new stats for consultantId application
  @MessagePattern('getOfferAppliByconsultIdAndPending')
  async getOfferAppliByIdconsultIdAndPending(data: { consultantId: string }): Promise<number> {
    return this.applicationService.getAppliByIdconsultantAndPending(data.consultantId);
  }
  @MessagePattern('getAppliByconsultIdAndApproved')
  async getOfferAppliByconsultIdAndApproved(data: { consultantId: string }): Promise<number> {
    return this.applicationService.getAppliByIdconsultantAndApproved(data.consultantId);
  }
  @MessagePattern('getAppliByconsultIdAndRejected')
  async getOffergetAppliByconsultIdAndRejected(data: { consultantId: string }): Promise<number> {
    return this.applicationService.getAppliByIdconsultantAndRejected(data.consultantId);
  }
  @MessagePattern('getAppliByconsultIdAndHired')
  async getOffergetAppliByconsultIdAndHired(data: { consultantId: string }): Promise<number> {
    return this.applicationService.getAppliByIdconsultantAndHired(data.consultantId);
  }


}
