import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { RatingService } from './rating.service';
import { Rating } from './schemas/Rating.schema';
@Controller('ratings')
export class RatingController {
    constructor(private readonly ratingsService: RatingService) {}

  @MessagePattern('createRating')
  async createRating(data: { consultantId: string; userId: string; ratingValue: number }) {
    const { consultantId, userId, ratingValue } = data;
    return this.ratingsService.createOrUpdateRating(consultantId, userId, ratingValue);
  }
  @MessagePattern('getRatingsByConsultantId')
  async getRatingsByConsultantId(consultantId: string): Promise<Rating[]> {
    return this.ratingsService.getRatingsByConsultantId(consultantId);
  }

  @MessagePattern('getAllRatingsByUser')
  async findAllImagesByUser({ IdUser }: { IdUser: string }): Promise<any[]> {
    return this.ratingsService.findAllRatingsByUser(IdUser);
  }
  
}
