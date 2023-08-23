import { Controller, Get, HttpException, HttpStatus, Inject, Param, Post, Put, Delete, Body } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { QuizDto } from './dto/quiz.dto';

@Controller('quizzes')
export class QuizGatewayController {
  constructor(@Inject('QUIZ_SERVICE') private readonly quizService: ClientProxy) {}


  @Get('test')
    test(): string {
      return 'Test endpoint is working yaay ';
    }


  //@Get('test')
  //async testEndpoint() {
    //const payload = { cmd: 'test' };
    //console.log('Sending request with payload:', payload);
    //const response = await this.quizService.send(payload, {}).toPromise();
    //return response;
  //}

  @Get('all')
  async getQuizzes(): Promise<any> {
    try {
      const response = await this.quizService.send({ cmd: 'getQuizzes' }, {}).toPromise();
      return response;
    } catch {
      throw new HttpException('Microservice is not available', HttpStatus.NOT_FOUND);
    }
  }

  @Post()
  async createQuiz(@Body() quizDto: QuizDto): Promise<any> {
    try {
      const createdQuiz = await this.quizService.send({ cmd: 'createQuiz' }, quizDto).toPromise();
      return createdQuiz;
    } catch {
      throw new HttpException('Microservice is not available', HttpStatus.NOT_FOUND);
    }
  }

  @Get(':quizId')
  async getQuizById(@Param('quizId') quizId: string): Promise<any> {
    try {
      const response = await this.quizService.send({ cmd: 'getQuizById' }, quizId).toPromise();
      return response;
    } catch {
      throw new HttpException('Microservice is not available', HttpStatus.NOT_FOUND);
    }
  }

  @Put(':quizId')
  async updateQuiz(@Param('quizId') quizId: string, @Body() quizDto: QuizDto): Promise<any> {
    try {
      const response = await this.quizService.send({ cmd: 'updateQuiz' }, { quizId, quizDto }).toPromise();
      return response;
    } catch {
      throw new HttpException('Microservice is not available', HttpStatus.NOT_FOUND);
    }
  }

  @Delete(':quizId')
  async deleteQuiz(@Param('quizId') quizId: string): Promise<any> {
    try {
      const response = await this.quizService.send({ cmd: 'deleteQuiz' }, quizId).toPromise();
      return response;
    } catch {
      throw new HttpException('Microservice is not available', HttpStatus.NOT_FOUND);
    }
  }

  @Post(':quizId/assign/:IdUser')
  async assignQuizToUser(@Param('quizId') quizId: string, @Param('IdUser') userId: string): Promise<any> {
    try {
      const response = await this.quizService.send({ cmd: 'assignQuizToUser' }, { quizId, userId }).toPromise();
      return response;
    } catch {
      throw new HttpException('Microservice is not available', HttpStatus.NOT_FOUND);
    }
  }

  @Get(':quizId/report')
  async generateQuizReport(@Param('quizId') quizId: string): Promise<any> {
    try {
      const response = await this.quizService.send({ cmd: 'generateQuizReport' }, quizId).toPromise();
      return response;
    } catch {
      throw new HttpException('Microservice is not available', HttpStatus.NOT_FOUND);
    }
  }


  @Get(':userId/assigned')
  async getQuizzesAssignedToUser(@Param('userId') userId: string): Promise<any> {
    try {
      const response = await this.quizService.send({ cmd: 'getQuizzesAssignedToUser' }, userId).toPromise();
      return response;
    } catch {
      throw new HttpException('Microservice is not available', HttpStatus.NOT_FOUND);
    }
  }




  @Get('assigned/:userId')
  async getAssignedQuizzes(@Param('userId') userId: string): Promise<any> {
    try {
      const response = await this.quizService.send({ cmd: 'getAssignedQuizzes' }, userId).toPromise();
      return response;
    } catch {
      throw new HttpException('Microservice is not available', HttpStatus.NOT_FOUND);
    }
  }



}
