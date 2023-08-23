import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

interface Quiz {
  _id: string;
  title: string;
  description: string;
  questions: Question[];
  assignedTo: string[];
  IdUser: string;
  timer: number;
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
  __v: number;
}

interface User {
  _id: string;
  username: string;
}

@Component({
  selector: 'app-quiz-update',
  templateUrl: './quiz-update.component.html',
  styleUrls: ['./quiz-update.component.scss']
})
export class QuizUpdateComponent implements OnInit {
  quizId: string = '';
  quiz: Quiz | null = null;
  users: User[] = [];
  selectedUsers: string[] = [];

  constructor(private route: ActivatedRoute, private router: Router, private http: HttpClient) {}

  ngOnInit() {
    const quizId = this.route.snapshot.paramMap.get('id');
    if (quizId) {
      this.quizId = quizId;
      this.fetchQuizDetails(quizId);
      this.fetchUsers();
    } else {
      console.error('Quiz ID not provided.');
    }
  }

  fetchQuizDetails(quizId: string) {
    const apiUrl = `http://localhost:3000/quizzes/${quizId}`;
    this.http.get<Quiz>(apiUrl).subscribe(
      (response) => {
        this.quiz = response;
        this.selectedUsers = [...this.quiz.assignedTo]; // Pre-populate selected users
      },
      (error) => {
        console.error('Error fetching quiz details:', error);
      }
    );
  }

  updateQuizDetails() {
    if (this.quiz) {
      const apiUrl = `http://localhost:3000/quizzes/${this.quizId}`;
      this.http.put<Quiz>(apiUrl, this.quiz).subscribe(
        (response) => {
          console.log('Quiz updated successfully:', response);
          this.router.navigate(['/dashboardConsultor/quizzes']);
        },
        (error) => {
          console.error('Error updating quiz details:', error);
        }
      );
    }
  }


  saveQuizDetails() {
    if (this.quiz) {
      this.quiz.assignedTo = this.quiz.assignedTo.map((username) => {
        const user = this.users.find((u) => u.username === username);
        return user ? user._id : ''; // Return the user ID if user is found, otherwise an empty string
      });

      const apiUrl = 'http://localhost:3000/quizzes';
      this.http.post<Quiz>(apiUrl, this.quiz).subscribe(
        (response) => {
          console.log('Quiz saved successfully:', response);
          this.router.navigate(['/dashboardConsultor/quizzes']);
        },
        (error) => {
          console.error('Error saving quiz details:', error);
        }
      );
    }
  }

  fetchUsers() {
    const apiUrl = 'http://localhost:3000/auth/GetAllUsers';
    this.http.get<User[]>(apiUrl).subscribe(
      (response) => {
        this.users = response;
      },
      (error) => {
        console.error('Error fetching users:', error);
      }
    );
  }

  // Function to map user IDs to their corresponding usernames
  getUsernameById(userId: string): string {
    const user = this.users.find((u) => u._id === userId);
    return user ? user.username : ''; // Return the username if user is found, otherwise an empty string
  }


  fetchQuestionById(questionId: string) {
    const apiUrl = `http://localhost:3000/questions/${questionId}`;
    return this.http.get<Question>(apiUrl);
  }


  fetchQuestionsForQuiz(quizId: string) {
  const apiUrl = `http://localhost:3000/quizzes/${quizId}/questions`;
  this.http.get<Question[]>(apiUrl).subscribe(
    (response) => {
      if (this.quiz && this.quiz.questions) { // Ensure that this.quiz and this.quiz.questions are not undefined
        this.quiz.questions = response;
        // Fetch additional details for each question by ID
        this.quiz.questions.forEach((question) => {
          this.fetchQuestionById(question._id).subscribe(
            (questionDetails) => {
              question.text = questionDetails.text;
              question.type = questionDetails.type;
              question.options = questionDetails.options;
              question.difficulty = questionDetails.difficulty;
            },
            (error) => {
              console.error('Error fetching question details:', error);
            }
          );
        });
      }
    },
    (error) => {
      console.error('Error fetching questions for quiz:', error);
    }
  );
}







  
  
}
