import { Body, Headers, Controller, Delete, Get, HttpException, HttpStatus, Inject, Param, Post, Put, UnauthorizedException, Query } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

import { OfferDTO } from './dto/offer.dto';
import { get } from 'http';
import { SearchOffersDto } from './dto/SearchOffersDto.dto';

@Controller('offer')
export class OfferController {

    constructor(@Inject('ENTREPRISE-MC') private readonly entrepriseServiceClient: ClientProxy,
        @Inject('AUTH_SERVICE') private readonly authServiceClient: ClientProxy) { }

    @Get("getAllofferswithpagination")
    async findAllpageination(@Query('page') page: number, @Query('rows') rows: number) {
        try {
            const DATA = await this.entrepriseServiceClient.send<{}>("GetAllofferswithpagination", { page, rows });
            return DATA;
        } catch {
            throw new HttpException("Microservice is not available", HttpStatus.NOT_FOUND);
        }
    }

    @Get("getAlloffers")
        async findAll() {
          try {
            const DATA = await this.entrepriseServiceClient.send<{}>("GetAlloffers", {});
            return DATA;
          } catch {
            throw new HttpException("Microservice is not available", HttpStatus.NOT_FOUND);
          }
        }







    @Get("getOfferbyId/:_id")
    async getOfferById(@Param('_id') _id: string) {
        try {
            const DATA = await this.entrepriseServiceClient.send("getOfferbyId", _id);
            return DATA;
        } catch {
            throw new HttpException("Microservice is not available", HttpStatus.NOT_FOUND)

        }
    }
    @Get("getOfferByUserId/:IdUser")
    async findbyuserId(@Param('IdUser') IdUser) {
        try {
            const languagesData = await this.entrepriseServiceClient.send('getOfferByUserId', IdUser);
            return languagesData;
        } catch (error) {
            console.log(error);
            throw new HttpException("Microservice is not available", HttpStatus.NOT_FOUND);
        }
    }

    @Post('createOffer')
    async add(@Body() offerDTO: OfferDTO, @Headers() headers) {
        // Extract the JWT token from the request headers
        const token = headers['authorization']?.split(' ')[1];
        if (!token) {
            throw new UnauthorizedException('Missing authorization token');
        }
        // Verify the JWT token and extract the user ID
        const decodedToken = await firstValueFrom(this.authServiceClient.send('verifytoken', token));
        console.log(decodedToken)
        if (!decodedToken || !decodedToken.id) {
            throw new UnauthorizedException('Invalid authorization token');
        }
        const userId = decodedToken.id;
        console.log("User ID: " + userId);

        const newOfferDTO: OfferDTO = {
            IdUser: userId,
            ...offerDTO,
        };
        const newoffer = await this.entrepriseServiceClient.send('createOffer', newOfferDTO);
        return newoffer;
    }

    @Delete('deleteOfferByUserId/:IdUser')
    async delete(@Param('IdUser') IdUser) {
        try {
            const deletedData = await this.entrepriseServiceClient.send('deleteOfferByUserId', IdUser);
            return deletedData;
        } catch {
            throw new HttpException(
                'Microservice  is not available', HttpStatus.NOT_FOUND);
        }
    }



    @Put('updateOfferById/:id')
    async updateTrainingQualification(@Param('id') id: string, @Body() dataDto: OfferDTO): Promise<OfferDTO> {

        const updatedData = await firstValueFrom(this.entrepriseServiceClient.send<OfferDTO, any>('updateOfferById', { id, updateDataDto: dataDto }));

        return updatedData;
    }


    @Get("findAllOfferByIdUser/:IdUser")
    async findAllbyuserId(@Param('IdUser') IdUser) {
        try {
            const data = await this.entrepriseServiceClient.send('findAllOfferByIdUser', IdUser);
            return data;
        } catch (error) {
            console.log(error);
            throw new HttpException("Microservice is not available", HttpStatus.NOT_FOUND);
        }
    }

    @Post("search-offers")
    async searchOffers(@Body() searchFilters: SearchOffersDto) {
  try {
    const offers = await this.entrepriseServiceClient.send<SearchOffersDto>("searchOffers", searchFilters);
    return offers;
  } catch {
    throw new HttpException("Microservice is not available", HttpStatus.NOT_FOUND);
  }
}


    @Delete('removeOfferById/:id')
    async deleteDatAbYid(@Param('id') id) {
        try {
            const deleteddata = await this.entrepriseServiceClient.send('removeOfferById', id);
            return deleteddata;
        } catch {
            throw new HttpException(
                'Microservice is not available', HttpStatus.NOT_FOUND);
        }
    }
}
