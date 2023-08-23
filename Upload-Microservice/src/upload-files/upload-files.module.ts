import { Module } from '@nestjs/common';
import { UploadFilesService } from './upload-files.service';
import { UploadFilesController } from './upload-files.controller';
import { FileSchema } from './schemas/file.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports:[
    MongooseModule.forFeature([{ name: 'File', schema: FileSchema }])

  ],
  providers: [UploadFilesService],
  controllers: [UploadFilesController]
})
export class UploadFilesModule {}
