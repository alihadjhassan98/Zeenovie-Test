// quiz.service.ts

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Quiz, QuizDocument } from '../models/quiz.model';
import { QuizDto } from '../dto/quiz.dto';

@Injectable()
export class QuizService {
  constructor(
    @InjectModel(Quiz.name) private readonly quizModel: Model<QuizDocument>,
  ) {}

  async createQuiz(quizDto: QuizDto): Promise<Quiz> {
    const createdQuiz = new this.quizModel(quizDto);
    return createdQuiz.save();
  }

  async getQuizById(quizId: string): Promise<Quiz> {
    const quiz = await this.quizModel.findById(quizId).exec();
    if (!quiz) {
      throw new NotFoundException('Quiz not found');
    }
    return quiz;
  }

  async updateQuiz(quizId: string, quizDto: QuizDto): Promise<Quiz> {
    const updatedQuiz = await this.quizModel
      .findByIdAndUpdate(quizId, quizDto, { new: true })
      .exec();
    if (!updatedQuiz) {
      throw new NotFoundException('Quiz not found');
    }
    return updatedQuiz;
  }

  async deleteQuiz(quizId: string): Promise<Quiz> {
    const deletedQuiz = await this.quizModel.findByIdAndRemove(quizId).exec();
    if (!deletedQuiz) {
      throw new NotFoundException('Quiz not found');
    }
    return deletedQuiz;
  }

  async assignQuizToUser(quizId: string, userId: string): Promise<Quiz> {
    const quiz = await this.quizModel.findById(quizId).exec();
    if (!quiz) {
      throw new NotFoundException('Quiz not found');
    }
    quiz.assignedTo.push(userId);
    return quiz.save();
  }

  async generateQuizReport(quizId: string): Promise<any> {
    const quiz = await this.quizModel.findById(quizId).exec();
    if (!quiz) {
      throw new NotFoundException('Quiz not found');
    }

    // Implement the logic to generate the quiz report based on the quiz data and candidate responses.
    // This may involve fetching candidate data, checking quiz responses, and calculating scores.

    return { message: 'Quiz report generated', data: {} };
  }

  async getAllQuizzes(): Promise<Quiz[]> {
    // Implement the logic to fetch all quizzes from the database.
    // For example:
    return this.quizModel.find().exec();
  }



  async getQuizzesAssignedToUser(userId: string): Promise<Quiz[]> {
    // Find quizzes where the assignedTo array contains the userId
    const quizzes = await this.quizModel.find({ assignedTo: { $in: [userId] } }).exec();
    if (!quizzes || quizzes.length === 0) {
      throw new NotFoundException('No quizzes found for the specified user.');
    }
    return quizzes;
  }


  async getAssignedQuizzes(userId: string): Promise<Quiz[]> {
    const quizzes = await this.quizModel.find({ assignedTo: userId }).exec();
    return quizzes;
  }

  


  
}
