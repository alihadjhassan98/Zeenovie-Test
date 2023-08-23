import { FileDocument, File } from './schemas/file.schema';
import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";




@Injectable()
export class UploadFilesService {

  constructor(@InjectModel(File.name) private readonly fileModel: Model<FileDocument>) { }


  async uploadFile(base64EncodedFile: string, userId: string, name: string, contentType: string): Promise<File> {
    const file = new this.fileModel({ IdUser: userId, data: base64EncodedFile, name, contentType });
    return await file.save();
  }


  async loadFile(userId: string): Promise<File> {
    return await this.fileModel.findOne({ IdUser: userId }).exec();
  }

  async loadAllFiles(userId: string): Promise<File[]> {
    return await this.fileModel.find({ IdUser: userId }).exec();
  }

  async updateFile(IdUser: string, base64EncodedImage: string, name: string, contentType: string): Promise<File> {
    const updatedFile = await this.fileModel.findOneAndUpdate(
        { IdUser },
        { data: base64EncodedImage, name, contentType },
        { new: true }
    );
    if (!updatedFile) {
        throw new NotFoundException(`File with userId ${IdUser} not found`);
    }
    return updatedFile;
}

async updateFileById(_id: string, base64EncodedImage: string, name: string, contentType: string): Promise<File> {
  const updatedFile = await this.fileModel.findOneAndUpdate(
    { _id },
    { data: base64EncodedImage, name, contentType },
    { new: true }
  );
  if (!updatedFile) {
    throw new NotFoundException(`File with _id ${_id} not found`);
  }
  return updatedFile;
}





  async deleteFile(userId: string): Promise<void> {
    this.fileModel.findOneAndDelete({ IdUser: userId }).exec();
  }

  async removefileById(id: string): Promise<void> {
     this.fileModel.findByIdAndDelete(id).exec();
  }
  
  

}
