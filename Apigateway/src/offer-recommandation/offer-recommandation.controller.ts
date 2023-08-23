import { Controller, Get, HttpException, HttpStatus, Inject, Param } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { exec } from 'child_process';
import { writeFile } from 'fs';
import { join } from 'path';
import { firstValueFrom } from 'rxjs';
import { promisify } from 'util';

@Controller('offer-recommandation')
export class OfferRecommandationController {



    constructor(@Inject("CV-SERVICE") private readonly professionalDataService: ClientProxy,
        @Inject('ENTREPRISE-MC') private readonly ofeerService: ClientProxy
    ) { }

    @Get("getProfessionalDataByIdUser/:IdUser")
    async findbyuserId(@Param('IdUser') IdUser) {
        try {
            const ProData = await this.professionalDataService.send('getProfessionalDataByIdUser', IdUser);
            return ProData;
        } catch (error) {
            console.log(error);
            throw new HttpException("Microservice is not available", HttpStatus.NOT_FOUND);
        }
    }


    @Get("getAlloffers")
    async findAll() {
      try {
        const DATA = await this.ofeerService.send<{}>("GetAlloffers", {});
        return DATA;
      } catch {
        throw new HttpException("Microservice is not available", HttpStatus.NOT_FOUND);
      }
    }

 @Get('getUserDataForRecommendation/:userId')
async getUserDataForRecommendation(@Param('userId') userId: string) {
  try {
    const [offers, proData] = await Promise.all([
      firstValueFrom( await this.findAll()),
      firstValueFrom(await this.findbyuserId(userId)),
    
    ]);

    const userData = {
      offers,
      proData,
    };
    const input_json = JSON.stringify(userData);
 
  
    const filePath = join('./src/offer-recommandation/', 'input.json');
    
    await writeFile(filePath, input_json, (err) => {
        if (err) {
          console.error('Error while writing file:', err);
        } else {
          console.log('File written successfully!');
        }
      });
      

    // Run your Python script with the userData object as input
    const scriptPath = './src/offer-recommandation/script.py';
    const args = [filePath];
    const execPromise = promisify(exec);
    const stdout = await execPromise(`"C:\\Users\\OMEN\\AppData\\Local\\Programs\\Python\\Python311\\python.exe"  ${scriptPath} ${args.join(' ')}`);


    const firstOffer = JSON.parse(stdout.stdout.trim());
// then parse the JSON
    
    return { firstOffer };
  } catch (error) {
    console.log(error);
    throw new HttpException('Microservice is not available', HttpStatus.NOT_FOUND);
  }
}
}