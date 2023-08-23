import { UploadFilesService } from './upload-files.service';
import { Body, Controller, Get, Param, Post, Res, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller('upload-files')
export class UploadFilesController {


  constructor(private readonly fileservise: UploadFilesService) { }


  @MessagePattern('uploadFile')
  async uploadImage(@Payload() fileData: any) {
    const { IdUser, data: base64EncodedImage, name, contentType } = fileData;
    //console.log("Received data:", { base64EncodedImage, IdUser, name, contentType });
    return await this.fileservise.uploadFile(base64EncodedImage, IdUser, name, contentType);
  }


  // @MessagePattern('updateFileByUserId')
  // async updateImageByUserId({ IdUser, base64EncodedImage, name, contentType }) {
  //   return await this.fileservise.updateFile(IdUser, base64EncodedImage, name, contentType);
  // }
  @MessagePattern('updateFileById')
  async updateImageByUserId({ _id, base64EncodedImage, name, contentType }) {
    return await this.fileservise.updateFileById(_id, base64EncodedImage, name, contentType);
  }

  @MessagePattern('getFileByUserId')
  async getFile({ userId }: { userId: string }) {
    return await this.fileservise.loadFile(userId);
  }


  @MessagePattern('getAllFilesByUserId')
  async getALLFiles({ userId }: { userId: string }): Promise<any[]> {
    return await this.fileservise.loadAllFiles(userId);
  }

  @MessagePattern('deleteFileByUserId')
  async deleteImage(id: string) {
    this.fileservise.deleteFile(id);
  }

  //done
  @MessagePattern('deleteFileById')
  async deleteImagebyId(id: string) {
    return this.fileservise.removefileById(id);
  }







}




