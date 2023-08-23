import { Body, Controller, Get, Headers, HttpException, HttpStatus, Inject, InternalServerErrorException, Param, Post, Put, UnauthorizedException } from '@nestjs/common';
import { EntrepriseDTO } from './dto/profile.dto';
import { firstValueFrom } from 'rxjs';
import { ClientProxy } from '@nestjs/microservices';


@Controller('entreprise')
export class ProfileController {

    constructor(@Inject('ENTREPRISE-MC') private readonly entrepriseServiceClient: ClientProxy,
        @Inject('AUTH_SERVICE') private readonly authServiceClient: ClientProxy) { }



    @Get('getAllEntreprises')
    async findAll(): Promise<EntrepriseDTO[]> {
        try {
            const entreprises = await firstValueFrom(this.entrepriseServiceClient.send('getAllEntreprises', {}));
            return entreprises;
        } catch {
            throw new HttpException('Microservice is not available', HttpStatus.NOT_FOUND);
        }
    }
 

    @Get('findAllbyUserid')
    async findAllbyUserid(): Promise<EntrepriseDTO[]> {
        try {
            const entreprises = await firstValueFrom(this.entrepriseServiceClient.send('findAllbyUserid', {}));
            return entreprises;
        } catch {
            throw new HttpException('Microservice is not available', HttpStatus.NOT_FOUND);
        }
    }

    @Post("loadEntreprisesByUserIds")
    async findImagesByUserIds(@Body('userIds') userIds: string[]) {
        try {
            const entreprises = await this.entrepriseServiceClient.send('loadEntreprisesByUserIds', userIds);
            return entreprises;
        } catch (error) {
            console.log(error);
            throw new HttpException("Microservice is not available", HttpStatus.NOT_FOUND);
        }
    }


    @Get('getEntrepriseById/:id')
    async findById(@Param('id') id: string): Promise<EntrepriseDTO> {
        try {
            const entreprise = await firstValueFrom(this.entrepriseServiceClient.send('getEntrepriseById', id));
            return entreprise;
        } catch {
            throw new HttpException('Microservice is not available', HttpStatus.NOT_FOUND);
        }
    }

    @Put('updateEntreprise/:id')
    async updateById(@Param('id') id: string, @Body() entrepriseDto: EntrepriseDTO): Promise<EntrepriseDTO> {
        try {
            const updatedEntreprise = await firstValueFrom(this.entrepriseServiceClient.send('updateEntreprise', { id, entrepriseDTO: entrepriseDto }));
            return updatedEntreprise;
        } catch {
            throw new HttpException('Microservice is not available', HttpStatus.NOT_FOUND);
        }
    }

    @Post('deleteEntreprise/:id')
    async deleteById(@Param('id') id: string): Promise<EntrepriseDTO> {
        try {
            const deletedEntreprise = await firstValueFrom(this.entrepriseServiceClient.send('deleteEntreprise', id));
            return deletedEntreprise;
        } catch {
            throw new HttpException('Microservice is not available', HttpStatus.NOT_FOUND);
        }
    }

    @Post('create')
    async create(@Body() entrepriseDto: EntrepriseDTO, @Headers() headers): Promise<EntrepriseDTO> {
        // Extract the JWT token from the request headers
        const token = headers['authorization']?.split(' ')[1];
        if (!token) {
            throw new UnauthorizedException('Missing authorization token');
        }
        // Verify the JWT token and extract the user ID
        const decodedToken = await firstValueFrom(this.authServiceClient.send('verifytoken', token));
        if (!decodedToken || !decodedToken.id) {
            throw new UnauthorizedException('Invalid authorization token');
        }
        const userId = decodedToken.id;

        const newProfessionalData: EntrepriseDTO = {
            IdUser: userId,
            ...entrepriseDto,
        };

        const createdEntreprise = await firstValueFrom(this.entrepriseServiceClient
            .send('createEntreprise', newProfessionalData));
        return createdEntreprise;
    }



}
