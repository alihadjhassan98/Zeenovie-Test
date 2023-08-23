import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Router } from '@angular/router';


interface Quiz {
  _id: string;
  title: string;
  description: string;
  questions: Question[]; // Array of Question objects
  assignedTo: string[];
  IdUser: string;
  timer: number; // Add the timer field to hold the quiz duration in minutes

  __v: number;
}

interface Question {
  _id: string;
  text: string;
  type: string;
  options: {
    text: string;
    isCorrect: boolean;
    _id: string;
  }[];
  difficulty: string;
  categorie: string; // Add the categorie field here

  __v: number;
}

interface User {
  _id: string;
  email: string;
  username: string;
  role: string;
  is_confirmed: boolean;
  resetPasswordToken: string | null;
  resetPasswordExpires: string | null;
  createdAt: string;
  id: string;
}

@Component({
  selector: 'app-quiz-list',
  templateUrl: './quiz-list.component.html',
  styleUrls: ['./quiz-list.component.css']
})
export class QuizListComponent implements OnInit {
  quizzes: Quiz[] = [];
  loggedInUserId: string | null;
  assignedToUsers: { [userId: string]: User } = {}; // Store user details by their ID

  addQuestions(quizId: string) {
    // Replace 'question-creation' with the actual route path for the question creation page
    this.router.navigate(['quizzes/create-questions/:quizId', quizId]);
  }

  constructor(private authService: AuthService, private http: HttpClient,private router: Router) {
    this.loggedInUserId = authService.getLoggedInUserId();
    console.log('Logged in user ID:', this.loggedInUserId);
  }

  

  ngOnInit() {
    this.fetchQuizzes();
  }

  fetchQuizzes() {
    const apiUrl = 'http://localhost:3000/quizzes/all';
    this.http.get<{ data: Quiz[] }>(apiUrl).subscribe(
      (response) => {
        this.quizzes = response.data;
        this.fetchQuestionsForQuizzes();
      },
      (error) => {
        console.error('Error fetching quizzes:', error);
      }
    );
  }

  fetchQuestionsForQuizzes() {
    this.quizzes.forEach((quiz) => {
      quiz.questions.forEach((questionId, index) => {
        const questionUrl = `http://localhost:3000/questions/${questionId}`;
        this.http.get<Question>(questionUrl).subscribe(
          (questionData) => {
            quiz.questions[index] = questionData;
          },
          (error) => {
            console.error('Error fetching questions:', error);
          }
        );
      });
    });

    this.fetchAssignedToUsers(); // Fetch assignedTo user details
  }

  fetchAssignedToUsers() {
    this.quizzes.forEach((quiz) => {
      quiz.assignedTo.forEach((userId) => {
        if (!this.assignedToUsers[userId]) {
          const userUrl = `http://localhost:3000/auth/getUserById/${userId}`;
          this.http.get<User>(userUrl).subscribe(
            (userData) => {
              this.assignedToUsers[userId] = userData;
              console.log('User data:', userData);
            },
            (error) => {
              console.error('Error fetching user details:', error);
            }
          );
        }
      });
    });
  }

  canViewQuiz(quiz: Quiz): boolean {
    return this.loggedInUserId === quiz.IdUser;
  }

  deleteQuiz(quizId: string) {
    const apiUrl = `http://localhost:3000/quizzes/${quizId}`;
    this.http.delete(apiUrl).subscribe(
      (response) => {
        console.log('Quiz deleted successfully:', response);
        // Remove the deleted quiz from the 'quizzes' array
        this.quizzes = this.quizzes.filter((quiz) => quiz._id !== quizId);
      },
      (error) => {
        console.error('Error deleting quiz:', error);
      }
    );
  }
}
