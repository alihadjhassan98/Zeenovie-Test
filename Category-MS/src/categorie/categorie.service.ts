import { CreateCategorieDto } from './dto/create-categorie.dto';
/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Categorie, CategorieDocument } from './schemas/Categorie.schema';
import { UpdateCategorieDto } from './dto/update-categorie.dto';

@Injectable()
export class CategorieService {


  constructor(@InjectModel(Categorie.name) private catModel: Model<CategorieDocument>) { }



  async create(createCategorieDto: CreateCategorieDto): Promise<Categorie> {
    const createdCat = new this.catModel(createCategorieDto);
    return createdCat.save();
  }

  async findAll() {
    return this.catModel.find().populate('childrens')

  }

  async findOne(id): Promise<Categorie> {
    return this.catModel.findOne({ _id: id }).populate("Parent").populate('childrens');
  }


  async getAllChilds(id) {
    const categorieToFind = await this.catModel.findById(id);
    console.log(categorieToFind)
    /*

     { "authors": { "$regex": "Alex", "$options": "i" } },*/
    return await this.catModel.find({ "absolutePath": { "$regex": categorieToFind.absolutePath, "$options": "i" } });
  }
  async DeleteByCategoryId(categoryId: string) {
    return await this.catModel.findByIdAndDelete(categoryId)
  }
  async UpdateCategory(updateCategorieDto: UpdateCategorieDto) {
    const { _id, ...updateData } = updateCategorieDto;
    return await this.catModel.findOneAndUpdate({ _id: _id }, updateData, { new: true });
  }


}

/*
  update( ) {
    return `This action updates a  categorie`;
  }

  remove(id: number) {
    return `This action removes a #${id} categorie`;
  }*/

