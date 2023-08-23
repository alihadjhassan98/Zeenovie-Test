/* eslint-disable prettier/prettier */
import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CategorieController } from './categorie/categorie.controller';
import { CategorieModule } from './categorie/categorie.module';
import { CategorieService } from './categorie/categorie.service';
import { ConfigModule } from '@nestjs/config';
import { CategorieSchema } from './categorie/schemas/Categorie.schema';

@Module({
  imports: [ 
  ConfigModule.forRoot(),
  MongooseModule.forRoot(process.env.MONGODB_URI),
  HttpModule,
  CategorieModule,
],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
