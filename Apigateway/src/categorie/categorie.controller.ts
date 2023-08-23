import { Body, Controller, Delete, Get, HttpException, HttpStatus, Inject, Param, Post, Put } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CategorieDto } from './dto/categorie.dto';

@Controller('categorie')
export class CategorieController {
    constructor(@Inject("CATEGORIE_SERVICE") private readonly categorieService: ClientProxy) { }

    @Get("all")
    async getAll() {
        try {
            const categories = await this.categorieService.send("all", {});
            return categories
        }
        catch {
            throw new HttpException("Microservice is not available", HttpStatus.NOT_FOUND)
        }

    }
    @Get('get/:id')
    async getById(@Param('id') id) {
        try {
            const categories = await this.categorieService.send("getbyId", id);
            return categories
        }
        catch {
            throw new HttpException("Microservice is not available", HttpStatus.NOT_FOUND)
        }

    }

    @Get('childrens/:id')
    async getChildrens(@Param('id') id) {
        try {
            const categories = await this.categorieService.send("childrens", id);
            return categories
        }
        catch {
            throw new HttpException("Microservice is not available", HttpStatus.NOT_FOUND)
        }

    }

    @Post("add")
    async add(@Body() categorieDto: CategorieDto) {
        try {
            const categorie = await this.categorieService.send("add", categorieDto);
            return categorie
        }
        catch {
            throw new HttpException("Microservice is not available", HttpStatus.NOT_FOUND)
        }
    }

    @Delete('deletecat/:id')
    async delete(@Param('id') id: string) {
        console.log('deleting' + id);
        try {
            const res = await this.categorieService.send({ cmd: 'deletecat' }, { id });
            return res;
        } catch {
            throw new HttpException('Microservice is not available', HttpStatus.NOT_FOUND);
        }
    }
    @Put('update')
    async update(@Body() updateCategorieDto: CategorieDto) {
        try {
            console.log('object sended from getway succefully here ' + updateCategorieDto);
            const res = await this.categorieService.send({ cmd: 'updatecat' }, { cat: updateCategorieDto });
            return res;
        } catch {
            throw new HttpException('Microservice is not available', HttpStatus.NOT_FOUND);
        }
    }

}
