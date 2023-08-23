import { Controller, Inject, Get, Headers, HttpException, HttpStatus, Post, Body, Param, Delete, Put, Request, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { ClientProxy, Payload } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { LanguageDTO } from './dto/Languages.dto';


@Controller('languages')
export class LanguagesController {
    constructor(@Inject("CV-SERVICE") private readonly languagesService: ClientProxy,
        @Inject('AUTH_SERVICE') private readonly authServiceClient: ClientProxy
    ) { }


    @Get("findAllLangues")
    async findAll() {
        try {
            const ProData = await this.languagesService.send<LanguageDTO, {}>("findAllLangues", {});
            return ProData;
        } catch {
            throw new HttpException("Microservice is not available", HttpStatus.NOT_FOUND)
        }
    }

    @Get("findOnetrainingyUserId/:IdUser")
    async findbyuserId(@Param('IdUser') IdUser) {
        try {
            const languagesData = await this.languagesService.send('findOneLangueByUserId', IdUser);
            return languagesData;
        } catch (error) {
            console.log(error);
            throw new HttpException("Microservice is not available", HttpStatus.NOT_FOUND);
        }
    }

    @Post('createLangue')
    async add(@Body() languageDTO: LanguageDTO, @Headers() headers) {
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

        const newlanguageDTO: LanguageDTO = {
            IdUser: userId,
            ...languageDTO,
        };
        const newlanguage = await this.languagesService.send('createLangue', newlanguageDTO);
        return newlanguage;
    }

    @Delete('removeLangueByUserId/:IdUser')
    async delete(@Param('IdUser') IdUser) {
        try {
            const deletedlanguagesData = await this.languagesService.send('removeLangueByUserId', IdUser);
            return deletedlanguagesData;
        } catch {
            throw new HttpException(
                'Microservice  is not available', HttpStatus.NOT_FOUND);
        }
    }


    @Put('updateLangueByUserId/:IdUser')
    async update(@Param('IdUser') IdUser: string, @Body() dataDto: LanguageDTO): Promise<LanguageDTO> {
        console.log(" data equals to " + dataDto.certificate)
        try {
            const data = await firstValueFrom(this.languagesService.send<LanguageDTO, { IdUser: string, dataDto: LanguageDTO }>('updateLangueByUserId', { IdUser, dataDto }));
            return data;
        } catch (error) {
            throw new HttpException('Microservice is not available', HttpStatus.NOT_FOUND);
        }
    }


    @Put('updateById/:id')
    async updateTrainingQualification(@Param('id') id: string, @Body() dataDto: LanguageDTO): Promise<LanguageDTO> {

        const updatedData = await firstValueFrom(this.languagesService.send<LanguageDTO, any>('updateLangueById', { id, updateDataDto: dataDto }));

        return updatedData;
    }


    @Get("findAllLanguesByIdUser/:IdUser")
    async findAllbyuserId(@Param('IdUser') IdUser) {
        try {
            const data = await this.languagesService.send('findAllLanguesByIdUser', IdUser);
            return data;
        } catch (error) {
            console.log(error);
            throw new HttpException("Microservice is not available", HttpStatus.NOT_FOUND);
        }
    }


    @Delete('removeLangueById/:id')
    async deleteDatAbYid(@Param('id') id) {
        try {
            const deleteddata = await this.languagesService.send('removeLangueById', id);
            return deleteddata;
        } catch {
            throw new HttpException(
                'Microservice is not available', HttpStatus.NOT_FOUND);
        }
    }
}
