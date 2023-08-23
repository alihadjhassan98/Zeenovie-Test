/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Patch, Param, Delete, } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CategorieService } from './categorie.service';
import { CreateCategorieDto } from './dto/create-categorie.dto';
import { Categorie } from './schemas/Categorie.schema';
import { UpdateCategorieDto } from './dto/update-categorie.dto';


@Controller()
export class CategorieController {
  constructor(private readonly categorieService: CategorieService) { }
  @MessagePattern({ cmd: 'updatecat' })
  UpdateCategorie(data: { cat: UpdateCategorieDto }) {
    console.log("object recived from micro services " + data.cat);
    return this.categorieService.UpdateCategory(data.cat);
  }

  //@Post('add')
  @MessagePattern('add')
  async Add(@Payload() categorie: CreateCategorieDto) {

    categorie.code = categorie.title.toUpperCase();

    if (categorie.Parent == null || categorie.Parent == undefined) { categorie.absolutePath = "/" + categorie.code; }
    else {
      const cat = await this.findOne(categorie.Parent);
      categorie.absolutePath = cat["absolutePath"] + "/" + categorie.code;
    }

    return await this.categorieService.create(categorie);

  }

  @MessagePattern('all')
  async findAll() {
    const lista = await this.categorieService.findAll();
    return lista;

  }

  @MessagePattern('getbyId')
  findOne(id): Promise<Categorie> {
    return this.categorieService.findOne(id);
  }


  @MessagePattern('childrens')
  async getChilds(id) {
    return await this.categorieService.getAllChilds(id);

  }

  @MessagePattern({ cmd: 'deletecat' })
  remove(data: { id: string }) {
    return this.categorieService.DeleteByCategoryId(data.id);
  }

}
