// question.service.ts

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Question } from '../models/questions.model'; // Update the import
import { QuestionsDto } from '../dto/questions.dto';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class QuestionsService {
  constructor(
    @InjectModel(Question.name) private readonly questionModel: Model<Question>,
  ) {}

  async createQuestion(questionDto: QuestionsDto): Promise<Question> {
    const createdQuestion = new this.questionModel(questionDto);
    return createdQuestion.save();
  }

  async getQuestionById(questionId: string): Promise<Question> {
    const question = await this.questionModel.findById(questionId).exec();
    if (!question) {
      throw new NotFoundException('Question not found');
    }
    return question;
  }


  

  async updateQuestion(questionId: string, questionDto: QuestionsDto): Promise<Question> {
    const updatedQuestion = await this.questionModel
      .findByIdAndUpdate(questionId, questionDto, { new: true })
      .exec();
    if (!updatedQuestion) {
      throw new NotFoundException('Question not found');
    }
    return updatedQuestion;
  }

  async deleteQuestion(questionId: string): Promise<Question> {
    const deletedQuestion = await this.questionModel.findByIdAndRemove(questionId).exec();
    if (!deletedQuestion) {
      throw new NotFoundException('Question not found');
    }
    return deletedQuestion;
  }

  async getAllQuestions(): Promise<Question[]> {
    const questions = await this.questionModel.find().exec();
    return questions;
  }



  async getQuestionsByCategory(categoryId: string): Promise<Question[]> {
    try {
      return this.questionModel.find({ categorie: categoryId }).exec();
    } catch (error) {
      throw new RpcException('Error fetching questions by category');
    }
  }
}


