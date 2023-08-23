import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Rating } from './schemas/rating.schema';

@Injectable()
export class RatingService {

    constructor(@InjectModel(Rating.name) private ratingModel: Model<Rating>) {}

    async createOrUpdateRating(consultantId: string, userId: string, ratingValue: number): Promise<Rating> {
      const existingRating = await this.ratingModel.findOne({ consultantId, userId });
    
      if (existingRating) {
        return await this.updateRating(existingRating._id, ratingValue);
      } else {
        const newRating = new this.ratingModel({ consultantId, userId, ratingValue });
        return newRating.save();
      }
    }
    
    async findAllRatingsByUser(IdUser: string): Promise<Rating[]> {
      const newRating = await this.ratingModel.find({ IdUser });
      return newRating;
    }
  
    async getRatingsByConsultantId(consultantId: string): Promise<Rating[]> {
      return this.ratingModel.find({ consultantId }).exec();
    }

    async updateRating(id: string, ratingValue: number): Promise<Rating> {
      const updatedRating = await this.ratingModel.findByIdAndUpdate(
        id,
        { ratingValue },
        { new: true }
      );
      return updatedRating;
    }
}
