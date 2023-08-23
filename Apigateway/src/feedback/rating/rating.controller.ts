import { Body, Controller, Get, HttpException, HttpStatus, Inject, Param, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { Ratingss } from './dto/rating.dto';

@Controller('ratings')
export class RatingController {

    constructor(@Inject('ENTREPRISE-MC') private readonly ratingsService : ClientProxy, @Inject('AUTH_SERVICE') private readonly authServiceClient : ClientProxy,  @Inject("UPLOAD-MC") private readonly ImageService: ClientProxy) {}

  @Post()
  async createRating(@Body('consultantId') consultantId: string, @Body('userId') userId: string, @Body('ratingValue') ratingValue: number) {
    try {
      const newRating = await firstValueFrom(this.ratingsService.send('createRating', { consultantId, userId, ratingValue }));
      return newRating;
    } catch {
      throw new HttpException("Microservice is not available", HttpStatus.NOT_FOUND);
    }
  }

  @Get('ratings/:consultantId')
  async getRatingsByConsultantId(@Param('consultantId') consultantId: string): Promise<Ratingss[]> {
    try {
      const ratings = await firstValueFrom(this.ratingsService.send<Ratingss[], string>('getRatingsByConsultantId', consultantId));
      return ratings;
    } catch {
      throw new HttpException("Microservice is not available", HttpStatus.NOT_FOUND);
    }
  }
  
}
