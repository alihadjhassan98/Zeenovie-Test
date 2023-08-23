import { Body, Controller, Delete, Get, HttpException, HttpStatus,Headers, Inject, Param, Put, UnauthorizedException, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { AdditionalDataDTO } from './dto/additional-data.dto';

@Controller('additional-data')
export class AdditionalDataController {

    constructor(@Inject("CV-SERVICE") private readonly additionalService: ClientProxy,
    @Inject('AUTH_SERVICE') private readonly authServiceClient: ClientProxy
) { }

@Put('updateAdditionalInfo/:id')
async updateAdditionalInfo(@Param('id') id: string, @Body() dataDto: AdditionalDataDTO): Promise<AdditionalDataDTO> {
    console.log('ID:', id);
    console.log('Data DTO:', dataDto);

    const updatedData = await firstValueFrom(this.additionalService.send<AdditionalDataDTO, any>('updateAdditionalInfoById', { id, updateDataDto: dataDto }));

    console.log('Updated Data:', updatedData);
    return updatedData; 
}



@Get("findAllAdditionalInfoByIdUser/:IdUser")
async findAllbyuserId(@Param('IdUser') IdUser) {
    try {
        const data = await this.additionalService.send('findAllAdditionalInfoByIdUser', IdUser);
        return data;
    } catch (error) {
        console.log(error);
        throw new HttpException("Microservice is not available", HttpStatus.NOT_FOUND);
    }
}

@Delete('removeAdditionalInfoById/:id')
async delete(@Param('id') id) {
    try {
        const deleteddata = await this.additionalService.send('removeAdditionalInfoById', id);
        return deleteddata;
    } catch {
        throw new HttpException(
            'Microservice is not available', HttpStatus.NOT_FOUND);
    }
}

@Post('createAdditionalInfo')
async addAdditionalInfo(@Body() proexpDataDTO: AdditionalDataDTO, @Headers() headers) {
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
    //     // Check if a professional data record already exists for the user
    //     const existingProData = await this.findbyuserId(userId)
    //     existingProData.subscribe(async data => {
    //         data
    //         console.log("prodata :",data);
    //     if (data===null) {
    //     } else {
    //         throw new HttpException('Professional data already exists for this user', HttpStatus.BAD_REQUEST);}})
    // Create a new professional data record for the user
    const newAdditionalDataDTO: AdditionalDataDTO = {
        IdUser: userId,
        ...proexpDataDTO,
    };
    const newdata = await this.additionalService
        .send('createAdditionalInfo', newAdditionalDataDTO);
    return newdata;
}


@Get("getAlladditionalInfo")
async findAlladditionalService() {
    try {
        const proExp = await this.additionalService.send<AdditionalDataDTO, {}>("getAlladditionalInfo", {});
        return proExp;
    } catch {
        throw new HttpException("Microservice is not available", HttpStatus.NOT_FOUND)
    }
}

@Get("getAdditionalInfoByUserId/:IdUser")
async findadditionalServiceByUserId(@Param('IdUser') IdUser) {
    try {
        const proExp = await this.additionalService.send('getAdditionalInfoByUserId', IdUser);
        return proExp;
    } catch (error) {
        console.log(error);
        throw new HttpException("Microservice is not available", HttpStatus.NOT_FOUND);
    }
}

@Delete('deleteaAdditionalInfoByUserId/:IdUser')
async deleteadditionalServiceByUserId(@Param('IdUser') IdUser) {
    try {
        const deletedProExpData = await this.additionalService.send('deleteaAdditionalInfoByUserId', IdUser);
        return deletedProExpData;
    } catch {
        throw new HttpException(
            'Microservice  is not available', HttpStatus.NOT_FOUND);
    }
}

@Put('updateadditionalInfoByUserId/:IdUser')
async update(@Param('IdUser') IdUser: string, @Body() dataDto: AdditionalDataDTO): Promise<AdditionalDataDTO> {
    try {
        const updatedProExpData = await firstValueFrom(this.additionalService.send<AdditionalDataDTO, { IdUser: string, dataDto: AdditionalDataDTO }>('updateadditionalInfoByUserId', { IdUser, dataDto }));
        return updatedProExpData;
    } catch (error) {
        throw new HttpException('Microservice is not available', HttpStatus.NOT_FOUND);
    }
}



}
