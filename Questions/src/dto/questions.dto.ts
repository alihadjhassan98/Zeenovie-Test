// question.dto.ts

import { IsNotEmpty, IsString, IsArray } from 'class-validator';

export class QuestionsDto {
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


  @IsNotEmpty()
  @IsString()
  categorie: string; // Add the categorie field
}
