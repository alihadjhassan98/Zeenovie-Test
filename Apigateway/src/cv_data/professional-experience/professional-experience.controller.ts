import { Controller, Get, HttpException, HttpStatus, Inject, Param, Headers, UnauthorizedException, Body, Post, Delete, Put } from '@nestjs/common';
import { ClientProxy, Payload } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { ProfessionalExperienceDTO } from './dto/professional-experience.dto';

@Controller('professional-experience')
export class ProfessionalExperienceController {
    constructor(@Inject("CV-SERVICE") private readonly proExperience: ClientProxy,
        @Inject('AUTH_SERVICE') private readonly authServiceClient: ClientProxy
    ) { }

    @Put('updateById/:id')
    async updateTrainingQualification(@Param('id') id: string, @Body() dataDto: ProfessionalExperienceDTO): Promise<ProfessionalExperienceDTO> {
        console.log('ID:', id);
        console.log('Data DTO:', dataDto);

        const updatedData = await firstValueFrom(this.proExperience.send<ProfessionalExperienceDTO, any>('updateProExpById', { id, updateDataDto: dataDto }));

        console.log('Updated Data:', updatedData);
        return updatedData;
    }



    @Get("findAllProExperienceByIdUser/:IdUser")
    async findAllbyuserId(@Param('IdUser') IdUser) {
        try {
            const data = await this.proExperience.send('findAllProExperienceByIdUser', IdUser);
            return data;
        } catch (error) {
            console.log(error);
            throw new HttpException("Microservice is not available", HttpStatus.NOT_FOUND);
        }
    }


    @Delete('removeProExperienceById/:id')
    async delete(@Param('id') id) {
        try {
            const deleteddata = await this.proExperience.send('removeProExperienceById', id);
            return deleteddata;
        } catch {
            throw new HttpException(
                'Microservice is not available', HttpStatus.NOT_FOUND);
        }
    }

    @Post('createProExperience')
    async addProfessionalExperience(@Body() proexpDataDTO: ProfessionalExperienceDTO, @Headers() headers) {
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
        const newproExperienceData: ProfessionalExperienceDTO = {
            IdUser: userId,
            ...proexpDataDTO,
        };
        const newProExpData = await this.proExperience
            .send('createProExperience', newproExperienceData);
        return newProExpData;
    }


    @Get("getAllProExperience")
    async findAllProExperience() {
        try {
            const proExp = await this.proExperience.send<ProfessionalExperienceDTO, {}>("getAllProExperience", {});
            return proExp;
        } catch {
            throw new HttpException("Microservice is not available", HttpStatus.NOT_FOUND)
        }
    }

    @Get("getProExperienceByUserId/:IdUser")
    async findProExperienceByUserId(@Param('IdUser') IdUser) {
        try {
            const proExp = await this.proExperience.send('getProExperienceByUserId', IdUser);
            return proExp;
        } catch (error) {
            console.log(error);
            throw new HttpException("Microservice is not available", HttpStatus.NOT_FOUND);
        }
    }




    @Delete('deleteProExperienceByUserId/:IdUser')
    async deleteProExperienceByUserId(@Param('IdUser') IdUser) {
        try {
            const deletedProExpData = await this.proExperience.send('deleteProExperienceByUserId', IdUser);
            return deletedProExpData;
        } catch {
            throw new HttpException(
                'Microservice PROFESSIONAL_DATA_SERVICE is not available', HttpStatus.NOT_FOUND);
        }
    }

    @Put('updateProExperienceByUserId/:IdUser')
    async update(@Param('IdUser') IdUser: string, @Body() dataDto: ProfessionalExperienceDTO): Promise<ProfessionalExperienceDTO> {
        try {
            const updatedProExpData = await firstValueFrom(this.proExperience.send<ProfessionalExperienceDTO, { IdUser: string, dataDto: ProfessionalExperienceDTO }>('updateProExperienceByUserId', { IdUser, dataDto }));
            return updatedProExpData;
        } catch (error) {
            throw new HttpException('Microservice is not available', HttpStatus.NOT_FOUND);
        }
    }

}
