import { IsNotEmpty, IsString, IsArray, IsNumber } from 'class-validator';

export class QuizDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsArray()
  questions: QuestionDto[];

  @IsArray()
  assignedTo: string[]; // Candidate IDs

  @IsNotEmpty()
  @IsString()
  IdUser: string; // ID of the user who created the quiz

  @IsNotEmpty()
  @IsNumber()
  timer: number; // Timer in minutes
}

export class QuestionDto {
  @IsNotEmpty()
  @IsString()
  text: string;

  @IsNotEmpty()
  @IsString()
  type: 'single-choice' | 'multiple-choice';

  @IsArray()
  options: { text: string; isCorrect: boolean }[];

  @IsNotEmpty()
  @IsString()
  difficulty: string;
}
