// question-gateway.controller.ts

import { Controller, Get, Post, Put, Delete, Body, Param, HttpStatus, HttpException, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { QuestionsDto } from './dto/questions.dto';

@Controller('questions')
export class QuestionGatewayController {
  constructor(@Inject('QUESTION_SERVICE') private readonly questionService: ClientProxy) {}

  @Get('test')
  async testEndpoint() {
    const payload = { cmd: 'test' };
    console.log('Sending request with payload:', payload);
    const response = await this.questionService.send(payload, {}).toPromise();
    return response;
  }

  @Get(':id')
  async getQuestionById(@Param('id') questionId: string) {
    try {
      const response = await this.questionService.send({ cmd: 'getQuestionById' }, questionId).toPromise();
      return response;
    } catch {
      throw new HttpException('Microservice is not available', HttpStatus.NOT_FOUND);
    }
  }

  @Get()
  async getAllQuestions() {
    try {
      const response = await this.questionService.send({ cmd: 'getAllQuestions' }, {}).toPromise();
      return response;
    } catch {
      throw new HttpException('Microservice is not available', HttpStatus.NOT_FOUND);
    }
  }

  @Post()
  async createQuestion(@Body() questionDto: QuestionsDto) {
    try {
      const response = await this.questionService.send({ cmd: 'createQuestion' }, questionDto).toPromise();
      return response;
    } catch {
      throw new HttpException('Microservice is not available', HttpStatus.NOT_FOUND);
    }
  }

  @Put(':id')
  async updateQuestion(@Param('id') questionId: string, @Body() questionDto: QuestionsDto) {
    try {
      const response = await this.questionService.send({ cmd: 'updateQuestion' }, { questionId, questionDto }).toPromise();
      return response;
    } catch {
      throw new HttpException('Microservice is not available', HttpStatus.NOT_FOUND);
    }
  }

  @Delete(':id')
  async deleteQuestion(@Param('id') questionId: string) {
    try {
      const response = await this.questionService.send({ cmd: 'deleteQuestion' }, questionId).toPromise();
      return response;
    } catch {
      throw new HttpException('Microservice is not available', HttpStatus.NOT_FOUND);
    }
  }


 


  @Get('categorie/:id')
  async getQuestionsByCategory(@Param('id') categoryId: string) {
    try {
      const response = await this.questionService.send({ cmd: 'getQuestionsByCategory' }, categoryId).toPromise();
      return response;
    } catch {
      throw new HttpException('Microservice is not available', HttpStatus.NOT_FOUND);
    }
  }
}
