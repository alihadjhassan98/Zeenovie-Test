import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Comments } from './schemas/comments.schema';

@Injectable()
export class CommentsService {
    constructor(
        @InjectModel(Comments.name)
        private CommentsModel: mongoose.Model<Comments>
    ) { }

    async findAllCommmentsByUserId(userId: string): Promise<Comments[]> {
        const res = await this.CommentsModel.find({ IdUser: userId });
        return res;
    }

    async create(data: Comments): Promise<Comments> {
        const res = await this.CommentsModel.create(data);
        return res;
    }

    async updateCommentByUserID(userId: string, data: Comments) {

        const updatedData = await this.CommentsModel.findOneAndUpdate(
            { IdUser: userId },
            { $set: data },
            { new: true, upsert: true }
        );
        return updatedData;
    }

    async remove(userId: string): Promise<Comments> {
         return this.CommentsModel.findOneAndDelete({ IdUser: userId }).exec();
    }
    async likeComment(commentId: string, userId: string): Promise<Comments> {
        const updatedComment = await this.CommentsModel.findByIdAndUpdate(
          commentId,
          { $inc: { likes: 1 }, $addToSet: { likedBy: userId } },
          { new: true }
        );
        return updatedComment;
      }
      
      async unlikeComment(commentId: string, userId: string): Promise<Comments> {
        const updatedComment = await this.CommentsModel.findByIdAndUpdate(
          commentId,
          { $inc: { likes: -1 }, $pull: { likedBy: userId } },
          { new: true }
        );
        return updatedComment;
      }

  
      

}
