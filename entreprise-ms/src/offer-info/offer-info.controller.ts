import { Body, Controller, NotFoundException } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { OfferInfoService } from './offer-info.service';
import { OfferInfo } from './schemas/offer-info.schema';
import { CreateOfferInfo } from './dto/create.dto';
import { UpdateOfferInfo } from './dto/update.dto';
import { SearchOffersDto } from './dto/SearchOffersDto.dto';

@Controller('offer')
export class OfferInfoController {

    constructor(private offerInfoService: OfferInfoService) { }

    
    //hedhy besh njibhom lkol blesh luser id 
    @MessagePattern('GetAllofferswithpagination')
    async getAllOfferInfo(data: { page: number; rows: number }) {
      return this.offerInfoService.findAllpagination(data.page, data.rows);
    }
    
  
    @MessagePattern('GetAlloffers')
    async getAllOffer() {
      return this.offerInfoService.findAll();
    }

    @MessagePattern('searchOffers')
    async searchOffers(@Payload() searchFilters: SearchOffersDto) {
      return this.offerInfoService.searchOffers(searchFilters);
    }



  
  
    @MessagePattern('createOffer')
    async addOfferInfo(@Body() data: CreateOfferInfo): Promise<OfferInfo> {
      return this.offerInfoService.create(data);
    }
  
    @MessagePattern("getOfferByUserId")
    async getOfferInfoById(userId): Promise<OfferInfo> {
  
      const data = this.offerInfoService.findOfferInfoByIdUser(userId);
      return data;
    }

    @MessagePattern("getOfferbyId")
    async getOfferById(id): Promise<OfferInfo> {
      const data = this.offerInfoService.findOfferById(id);
      return data;
    }
  
  
    @MessagePattern('deleteOfferByUserId')
    async deleteOfferInfo(userId: string): Promise<OfferInfo> {
      return this.offerInfoService.deleteOfferInfoByIdUser(userId);
    }
  
    @MessagePattern('updateOfferByUserId')
    // @Put('updateProExperienceByUserId/:IdUser')
    async updateProfessionalExperienceByUserId(@Body() data: { IdUser: string, dataDto: UpdateOfferInfo }): Promise<OfferInfo> {
      //  console.log("update bro ddddd "+ IdUser.toString());
      const updatedData = await this.offerInfoService.UpdateOfferInfoByIdUser(data.dataDto.IdUser, data.dataDto);
      // console.log("return data "+updatedData);
      return updatedData;
    }
  
    @MessagePattern("findAllOfferByIdUser")
    async getAllTrainingsQualificationsByIUser(userId: string): Promise<OfferInfo[]> {
      try {
        return await this.offerInfoService.findAllOfferInfo(userId);
      } catch (e) {
        throw new NotFoundException(e.message);
      }
    }
    @MessagePattern('updateOfferById')
    async updateTrainingQualification(@Body() data: { id: string, updateDataDto: UpdateOfferInfo }): Promise<OfferInfo> {
      console.log('Pro Experience Microservice: Received Data:', data);
    
      const { id, updateDataDto } = data;
      const updatedData = await this.offerInfoService.updateOfferInfoById(id, updateDataDto);
    
      console.log('Pro Experience Microservice: Updated Data:', updatedData);
      return updatedData;
    }
    
    @MessagePattern('removeOfferById')
    async DeleteTrainingQualificationsDataById(id: string): Promise<OfferInfo> {
      return this.offerInfoService.removeOfferInfo(id);
    }





}
