import { Body, Controller } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Comments } from './schemas/comments.schema';
import { MessagePattern } from '@nestjs/microservices';
import { UpdateCommentDto } from './dto/UpdateCommentDto.dto';
import { CreateCommentDto } from './dto/CreateCommentDto.dto';
import { CommentsService } from './comments.service';

@Controller('comments')
export class CommentsController {

    constructor(private readonly commentsService: CommentsService) { }

  
    @MessagePattern('CreateComment')
    async create(dataDto: CreateCommentDto): Promise<Comments> {
      const data = await this.commentsService.create(dataDto);
      return data;
    }
    @MessagePattern('updateComment')
    async updateCommentsByUserId(@Body() data: { IdUser: string, dataDto: UpdateCommentDto }): Promise<Comments> {
      const updatedData = await this.commentsService.updateCommentByUserID(data.dataDto.IdUser, data.dataDto);
 
      return updatedData;
    }
  
    @MessagePattern('deleteComments')
    async deleteProfessional(userId: string): Promise<Comments> {
      return this.commentsService.remove(userId);
    }
  
    @MessagePattern("findAllCommentsByIdUser")
    async getAllCommentsById(userId: string): Promise<Comments[]> {
        return await this.commentsService.findAllCommmentsByUserId(userId);
  
    }
    @MessagePattern('updateById')
    async updateComments(@Body() data: { id: string, updateDataDto: UpdateCommentDto }): Promise<Comments> {
        const { id, updateDataDto } = data;
        const updatedData = await this.commentsService.updateCommentByUserID(id, updateDataDto);
        return updatedData;
    }

    @MessagePattern('deleteComments')
    async DeleteCommentsById(id: string): Promise<Comments> {
        return this.commentsService.remove(id);
    }

    @MessagePattern('likeComment')
    async likeComment({ commentId, userId }: { commentId: string; userId: string }): Promise<Comments> {
      return this.commentsService.likeComment(commentId, userId);
    }
    
    @MessagePattern('unlikeComment')
    async unlikeComment({ commentId, userId }: { commentId: string; userId: string }): Promise<Comments> {
      return this.commentsService.unlikeComment(commentId, userId);
    }


 
}



