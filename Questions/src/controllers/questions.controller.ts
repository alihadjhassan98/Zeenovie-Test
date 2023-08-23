import { Controller, Post, Get, Put, Delete, Body, Param } from '@nestjs/common';
import { QuestionsDto } from '../dto/questions.dto';
import { QuestionsService } from '../services/questions.service';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller('questions')
export class QuestionsController {
  constructor(private readonly questionsService: QuestionsService) {}

  @MessagePattern({ cmd: 'createQuestion' })
  async createQuestion(@Payload() questionDto: QuestionsDto): Promise<any> {
    return this.questionsService.createQuestion(questionDto);
  }

  @MessagePattern({ cmd: 'getQuestionById' })
  async getQuestionById(@Payload() questionId: string): Promise<any> {
    return this.questionsService.getQuestionById(questionId);
  }

  @MessagePattern({ cmd: 'updateQuestion' })
  async updateQuestion(@Payload() { questionId, questionDto }: { questionId: string; questionDto: QuestionsDto }): Promise<any> {
    return this.questionsService.updateQuestion(questionId, questionDto);
  }

  @MessagePattern({ cmd: 'deleteQuestion' })
  async deleteQuestion(@Payload() questionId: string): Promise<any> {
    return this.questionsService.deleteQuestion(questionId);
  }

  @MessagePattern({ cmd: 'getAllQuestions' })
  async getAllQuestions(): Promise<any> {
    return this.questionsService.getAllQuestions();
  }

@MessagePattern({ cmd: 'getQuestionsByCategory' })
  async getQuestionsByCategory(@Payload() categoryId: string): Promise<any> {
    return this.questionsService.getQuestionsByCategory(categoryId);
  }

  
}
