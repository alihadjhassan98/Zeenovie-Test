import { Controller, Post, Get, Put, Delete, Body, Param } from '@nestjs/common';
import { QuizDto } from '../dto/quiz.dto';
import { QuizService } from '../services/quiz.service';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller('quizzes')
export class QuizController {
  constructor(private readonly quizService: QuizService) {}

  @MessagePattern({ cmd: 'test' })
  testEndpoint() {
    return { message: 'This is a test endpoint in the Quiz microservice' };
  }

  @MessagePattern({ cmd: 'getQuizzes' })
  async getQuizzes(): Promise<any> {
    const quizzes = await this.quizService.getAllQuizzes();
    return { data: quizzes };
  }

  @MessagePattern({ cmd: 'createQuiz' })
  async createQuiz(@Payload() quizDto: QuizDto): Promise<any> {
    const createdQuiz = await this.quizService.createQuiz(quizDto);
    return { message: 'Quiz created successfully', data: createdQuiz };
  }

  @MessagePattern({ cmd: 'getQuizById' })
  async getQuizById(@Payload() quizId: string): Promise<any> {
    const quiz = await this.quizService.getQuizById(quizId);
    if (!quiz) {
      return { message: 'Quiz not found' };
    }
    return { data: quiz };
  }

  @MessagePattern({ cmd: 'updateQuiz' })
  async updateQuiz(@Payload() { quizId, quizDto }: { quizId: string; quizDto: QuizDto }): Promise<any> {
    const updatedQuiz = await this.quizService.updateQuiz(quizId, quizDto);
    if (!updatedQuiz) {
      return { message: 'Quiz not found' };
    }
    return { message: 'Quiz updated successfully', data: updatedQuiz };
  }

  @MessagePattern({ cmd: 'deleteQuiz' })
  async deleteQuiz(@Payload() quizId: string): Promise<any> {
    const deletedQuiz = await this.quizService.deleteQuiz(quizId);
    if (!deletedQuiz) {
      return { message: 'Quiz not found' };
    }
    return { message: 'Quiz deleted successfully' };
  }

  @MessagePattern({ cmd: 'assignQuizToUser' })
  async assignQuizToUser(
    @Payload() { quizId, userId }: { quizId: string; userId: string },
  ): Promise<any> {
    const assignedQuiz = await this.quizService.assignQuizToUser(quizId, userId);
    if (!assignedQuiz) {
      return { message: 'Quiz or User not found' };
    }
    return { message: 'Quiz assigned to User successfully', data: assignedQuiz };
  }

  @MessagePattern({ cmd: 'generateQuizReport' })
  async generateQuizReport(@Payload() quizId: string): Promise<any> {
    const quizReport = await this.quizService.generateQuizReport(quizId);
    if (!quizReport) {
      return { message: 'Quiz not found or no attempts yet' };
    }
    return { data: quizReport };
  }

  @MessagePattern({ cmd: 'getQuizzesAssignedToUser' })
  async getQuizzesAssignedToUser(@Payload() userId: string): Promise<any> {
    try {
      const quizzes = await this.quizService.getQuizzesAssignedToUser(userId);
      return { data: quizzes };
    } catch (err) {
      return { message: err.message };
    }
  }


  @MessagePattern({ cmd: 'getAssignedQuizzes' })
async getAssignedQuizzes(@Payload() userId: string): Promise<any> {
  const assignedQuizzes = await this.quizService.getAssignedQuizzes(userId);
  return { data: assignedQuizzes };
}


  

  


}
