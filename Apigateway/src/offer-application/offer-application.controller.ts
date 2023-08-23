import { Body, Controller, Inject, Headers, Post, UnauthorizedException, Get, Param, HttpException, HttpStatus, Put } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { OfferApplication } from './dto/offer-application.dto';

@Controller('offer-application')
export class OfferApplicationController {
  constructor(@Inject('ENTREPRISE-MC') private readonly entrepriseServiceClient: ClientProxy,
    @Inject("CV-SERVICE") private readonly ServicesDataService: ClientProxy,
    @Inject('AUTH_SERVICE') private readonly authServiceClient: ClientProxy) { }

  @Post('applyForOffer')
  async applyForOffer(@Body() offerApplication: OfferApplication) {
    const newOfferApplication: OfferApplication = {
      appliedAt: new Date(),
      ...offerApplication,
    };
    const appliedOffer = await this.entrepriseServiceClient.send('applyForOffer', newOfferApplication);
    return appliedOffer;
  }

  @Get('appliedOffers/:consultantId')
  async getAppliedOffersByConsultantId(@Param('consultantId') consultantId: string) {
    const appliedOffers = await this.entrepriseServiceClient.send('getAppliedOffersByConsultantId', consultantId);
    return appliedOffers;
  }


  @Get('getOffersApplicationsByConsultantId/:consultantId')
  async getOfferApplicationsByConsultantId(
    @Param('consultantId') consultantId: string,
  ) {
    return await this.entrepriseServiceClient.send('getOffersApplicationsByConsultantId', consultantId);

  }
  // new
  @Get('getOffersApplicationsByOffreId/:id')
  async getOfferApplicationsByOffreIdPersonaldata(@Param('id') id: string,): Promise<OfferApplicationWithConsultant[]> {
    try {
      const offerApplications$ = this.entrepriseServiceClient.send('getOffersApplicationsByoffreId', id);
      const offerApplications = await firstValueFrom(offerApplications$);
      const populatedOfferApplications = await Promise.all(offerApplications.map(async (offerApplication) => {
        const personalData$ = this.ServicesDataService.send('getPersonalDataById', offerApplication.consultantId);
        const personalData = await firstValueFrom(personalData$);
        return {
          ...offerApplication,
          consultantObject: personalData
        };
      }));
      return populatedOfferApplications;
    } catch (error) {
      throw new HttpException("Microservice is not available", HttpStatus.NOT_FOUND);
    }
  }
  // new 
  @Put('updateOfferApplication/:offerApplicationId')
  async updateOfferApplication(
    @Param('offerApplicationId') offerApplicationId: string,
    @Body() updateData: OfferApplication,
  ): Promise<OfferApplication> {
    const result = await this.entrepriseServiceClient.send('updateOfferApplication', { offerApplicationId, updateData }).toPromise();
    return result;
  }
  @Get('getallofferapplication')
  async GettAllOffreApllications(): Promise<any> {
    try {
      const res = await this.entrepriseServiceClient.send('GetAllOfferApplication', {});
      return res;
    } catch {
      throw new HttpException('Microservice is not available', HttpStatus.NOT_FOUND);
    }
  }
  @Get('getOfferApplicationsByEntrepriseId/:id')
  async getOfferApplicationsByEntrepriseId(@Param('id') entrepriseID: string): Promise<OfferApplication> {
    const result = await firstValueFrom(
      this.entrepriseServiceClient.send('getAppliedOffersByentrepriseid', { entrepriseID }));
    return result;
  }
  // new status count entreprise application
  @Get('getAppliByIdAndPending/:id')
  async getOfferAppliByIdAndPending(@Param('id') entrepriseID: string): Promise<OfferApplication> {
    const result = await firstValueFrom(
      this.entrepriseServiceClient.send('getOfferAppliByIdAndPending', { entrepriseID }));
    return result;
  }
  @Get('getAppliByIdAndApproved/:id')
  async getAppliByIdAndApproved(@Param('id') entrepriseID: string): Promise<OfferApplication> {
    const result = await firstValueFrom(
      this.entrepriseServiceClient.send('getAppliByIdAndApproved', { entrepriseID }));
    return result;
  }
  @Get('getAppliByIdAndRejected/:id')
  async getAppliByIdAndRejected(@Param('id') entrepriseID: string): Promise<OfferApplication> {
    const result = await firstValueFrom(
      this.entrepriseServiceClient.send('getAppliByIdAndRejected', { entrepriseID }));
    return result;
  }
  @Get('getAppliByIdAndHired/:id')
  async getAppliByIdAndHired(@Param('id') entrepriseID: string): Promise<OfferApplication> {
    const result = await firstValueFrom(
      this.entrepriseServiceClient.send('getAppliByIdAndHired', { entrepriseID }));
    return result;
  }
  // new status count consultant application
  @Get('getOfferAppliByconsultIdAndPending/:id')
  async getOfferAppliByconsultantIdAndPending(@Param('id') consultantId: string): Promise<OfferApplication> {
    const result = await firstValueFrom(
      this.entrepriseServiceClient.send('getOfferAppliByconsultIdAndPending', { consultantId }));
    return result;
  }
  @Get('getAppliByconsultIdAndApproved/:id')
  async getAppliByconsultantIdAndApproved(@Param('id') consultantId: string): Promise<OfferApplication> {
    const result = await firstValueFrom(
      this.entrepriseServiceClient.send('getAppliByconsultIdAndApproved', { consultantId }));
    return result;
  }
  @Get('getAppliByconsultIdAndRejected/:id')
  async getAppliByconsultantIdAndRejected(@Param('id') consultantId: string): Promise<OfferApplication> {
    const result = await firstValueFrom(
      this.entrepriseServiceClient.send('getAppliByconsultIdAndRejected', { consultantId }));
    return result;
  }
  @Get('getAppliByconsultIdAndHired/:id')
  async getAppliByconsultantIdAndHired(@Param('id') consultantId: string): Promise<OfferApplication> {
    const result = await firstValueFrom(
      this.entrepriseServiceClient.send('getAppliByconsultIdAndHired', { consultantId }));
    return result;
  }



}
