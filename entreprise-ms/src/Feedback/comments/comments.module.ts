import { Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { CommentsSchema } from './schemas/comments.schema';

@Module({
  imports:[MongooseModule.forFeature([{name : 'Comments', schema: CommentsSchema}])],
  providers: [CommentsService],
  controllers: [CommentsController]
})
export class CommentsModule {}
