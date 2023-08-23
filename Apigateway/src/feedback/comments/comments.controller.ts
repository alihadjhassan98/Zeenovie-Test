import { Body,Controller,Get,HttpException,HttpStatus,Headers,Post,UnauthorizedException,Inject,Param,InternalServerErrorException,Delete, Put} from '@nestjs/common';
import {Comments} from './dto/comments.dto';
import {firstValueFrom} from 'rxjs';
import {ClientProxy} from '@nestjs/microservices';
import { CommentResponse, EntrepriseData, ImageDTO } from './dto/CommentResponse.interface';

@Controller('comments')
export class CommentsController {
    constructor(@Inject('ENTREPRISE-MC') private readonly commentService : ClientProxy, @Inject('AUTH_SERVICE') private readonly authServiceClient : ClientProxy,  @Inject("UPLOAD-MC") private readonly ImageService: ClientProxy) {}

    @Put('updateById/:id')
    async updateTrainingQualification(@Param('id')id : string, @Body()dataDto : Comments,): Promise < Comments > {
        const updatedData = await firstValueFrom(this.commentService.send<Comments, any>('updateById', {id, updateDataDto: dataDto}),);
        return updatedData;
    }

    @Get('findAllCommentByIdUser/:IdUser')
    async findAllbyuserId(@Param('IdUser')IdUser) {
        try {
            const data = await this.commentService.send('findAllCommentByIdUser', IdUser,);
            return data;
        } catch (error) {
            console.log(error);
            throw new HttpException('Microservice is not available', HttpStatus.NOT_FOUND,);
        }
    }

    @Delete('deleteComment/:id')
    async delete(@Param('id')id) {
        try {
            const deleteddata = await this.commentService.send('deleteComments', id);
            return deleteddata;
        } catch {
            throw new HttpException('Microservice is not available', HttpStatus.NOT_FOUND,);
        }}

    @Get('findAllCommentsByIdUser')
    async findAll() {
        try {
            const Data = await this.commentService.send<Comments, {}>('findAllCommentsByIdUser', {},);
            console.log('Comment here ?');
            return Data;
        } catch {
            throw new HttpException('Microservice is not available', HttpStatus.NOT_FOUND,);
        }}


    @Get('withCompanyDataAndImage/:IdUser')
    async findAllConsultantsWithProDataAndImage(@Param('IdUser') IdUser): Promise<CommentResponse[]> {
      const comments$ = this.commentService.send<CommentResponse[]>('findAllCommentsByIdUser', IdUser);
      const comments = await firstValueFrom(comments$);
      console.log(comments$) 
      const consultantsWithProDataAndImage = await Promise.all(
        comments.map(async comment => {
          const proData$ = this.commentService.send<EntrepriseData[], { IdUser: string }>('getAllEntreprisesByUser', { IdUser: comment.entrepriseId });
          const proData = await firstValueFrom(proData$);
  
          const image$ = this.ImageService.send<ImageDTO[], { IdUser: string }>('getAllImagesByUser', { IdUser: comment.entrepriseId });
          const images = await firstValueFrom(image$);
  
          return {
            ...comment,
            entreprisedata: proData,
            entrepriseimages: images
          };
        }),
      );
  
      return consultantsWithProDataAndImage;
    }

    @Post('create')
    async CreateAComment(@Body()Dto : Comments) : Promise < Comments > { // Extract the JWT token from the request headers
            const createdComment$ = this.commentService.send('CreateComment', Dto,);
            const createdComment = await firstValueFrom(createdComment$);
            console.log('ur data is ' + createdComment);
            return createdComment;
    }

    @Put('updateComment')
    async update(@Body()dataDto : Comments, @Body()id : string,) : Promise < Comments > {
        try {
            const data = await this.commentService.send<Comments, { id: string; dataDto: Comments }>('updateComment', {id, dataDto}).toPromise();
            return data;
        } catch (error) {
            throw new HttpException('Microservice is not available pliz check ur servers ', HttpStatus.NOT_FOUND,);
        }
    }

    @Get('get/:id')
    async getById(@Param('id')id) {
        try {
            const data = await this.commentService.send('findoneCommentById', id);
            console.log(' getway get by id ' + id);
            // not knowing the id fix it here
            return data;
        } catch {
            throw new HttpException('Microservice is not available', HttpStatus.NOT_FOUND,);
        }}

        @Post('like/:commentId')
        async likeComment(@Param('commentId') commentId: string, @Body('userId') userId: string): Promise<Comments> {
          try {
            const updatedComment = await firstValueFrom(
              this.commentService.send<Comments, { commentId: string; userId: string }>('likeComment', { commentId, userId: userId })
            );
            return updatedComment;
          } catch {
            throw new HttpException("Microservice is not available", HttpStatus.NOT_FOUND);
          }
        }
        
        @Post('unlike/:commentId')
        async unlikeComment(@Param('commentId') commentId: string, @Body('userId') userId: string): Promise<Comments> {
          try {
            const updatedComment = await firstValueFrom(
              this.commentService.send<Comments, { commentId: string; userId: string }>('unlikeComment', { commentId, userId: userId })
            );
            return updatedComment;
          } catch {
            throw new HttpException("Microservice is not available", HttpStatus.NOT_FOUND);
          }
        }
}

