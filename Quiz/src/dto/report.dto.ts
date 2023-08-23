import { IsNotEmpty, IsString, IsEmail, IsNumber, IsArray, IsBoolean, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class QuestionResponseDto {
  @IsNotEmpty()
  @IsString()
  questionId: string;

  @IsNotEmpty()
  @IsString()
  questionText: string;

  @IsArray()
  @IsString({ each: true })
  selectedOptions: string[];

  @IsArray()
  @IsString({ each: true })
  correctOptions: string[];

  @IsNotEmpty()
  @IsBoolean()
  isCorrect: boolean;
}

export class ReportDto {
  @IsNotEmpty()
  @IsString()
  userId: string;

  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  quizId: string;

  @IsNotEmpty()
  @IsString()
  quizTitle: string;

  @IsNotEmpty()
  @IsString()
  quizDescription: string;

  @IsNotEmpty()
  @IsNumber()
  totalQuestions: number;

  @IsNotEmpty()
  @IsNumber()
  correctAnswersCount: number;

  @IsNotEmpty()
  @IsNumber()
  totalScore: number;

  @IsNotEmpty()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => QuestionResponseDto)
  questionResponses: QuestionResponseDto[];

  @IsNotEmpty()
  @Type(() => Date)
  quizStartTime: Date;

  @IsNotEmpty()
  @Type(() => Date)
  quizEndTime: Date;

  @IsNotEmpty()
  @IsString()
  CompanyId: string;
}
