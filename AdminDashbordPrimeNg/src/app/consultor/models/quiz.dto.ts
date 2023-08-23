// quiz.dto.ts

export interface QuizDto {
    id: string;
    title: string;
    description: string;
    questions: QuestionDto[];
    assignedTo: string[];
    IdUser: string; // ID of the user who created the quiz
  }
  
  export interface QuestionDto {
    text: string;
    type: 'single-choice' | 'multiple-choice';
    options: { text: string; isCorrect: boolean }[];
    difficulty: string;
  }
  