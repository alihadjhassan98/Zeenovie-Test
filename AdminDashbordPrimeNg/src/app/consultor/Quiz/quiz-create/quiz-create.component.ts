import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';

interface Option {
  text: string;
  isCorrect: boolean;
}

export interface Question {
  _id: string; // Add the ID field to the Question interface
  text: string;
  type: 'single-choice' | 'multiple-choice';
  options: Option[];
}

interface Quiz {
  title: string;
  description: string;
  questions: Question[];
  timer: number;
  IdUser: string;
}

@Component({
  selector: 'app-quiz-create',
  templateUrl: './quiz-create.component.html',
  styleUrls: ['./quiz-create.component.css']
})
export class QuizCreateComponent implements OnInit {
  loggedInUserId!: string;
  quiz: Quiz = {
    title: '',
    description: '',
    questions: [],
    timer: 0,
    IdUser: ''
  };

  constructor(private authService: AuthService, private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.loggedInUserId = this.authService.getLoggedInUserId()!;

    // Check if there's state with questionId and quizId from QuestionCreationComponent
    const state = this.router.getCurrentNavigation()?.extras.state;
    if (state && state['questionId'] && state['quizId']) {
      this.linkQuestionToQuiz(state['questionId'], state['quizId']);
    }
  }

  addQuestion() {
    this.quiz.questions.push({ _id: '', text: '', type: 'single-choice', options: [] });
  }

  addOption(question: Question) {
    question.options.push({ text: '', isCorrect: false });
  }

  createQuiz() {
    this.quiz.IdUser = this.loggedInUserId;
    const apiUrl = 'http://localhost:3000/quizzes';
    this.http.post<Quiz>(apiUrl, this.quiz).subscribe(
      (response) => {
        console.log('Quiz created successfully:', response);
        this.router.navigate(['/dashboardConsultor/quizzes']);
      },
      (error) => {
        console.error('Error creating quiz:', error);
      }
    );
  }

  private linkQuestionToQuiz(questionId: string, quizId: string) {
    // Find the question with the given ID
    const question = this.quiz.questions.find((q) => q._id === '');
  
    // If the question is found, update its _id to the question ID from the server
    if (question) {
      question._id = questionId;
  
      // Optionally, you can perform additional logic here to link the question to the quiz on the server-side
    }
  }
}
