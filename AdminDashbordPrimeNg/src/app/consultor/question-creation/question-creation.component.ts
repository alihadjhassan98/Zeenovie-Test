import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

interface Option {
  text: string;
  isCorrect: boolean;
}

interface Question {
  text: string;
  type: 'single-choice' | 'multiple-choice';
  options: Option[];
  difficulty: string;
  categorie: string; // Add the categorie field here

  
}

interface QuestionResponse extends Question {
  _id: string;
}

interface Quiz {
  _id: string;
  title: string;
  description: string;
  questions: Question[];
  timer: number;
  IdUser: string;
}

@Component({
  selector: 'app-question-creation',
  templateUrl: './question-creation.component.html',
  styleUrls: ['./question-creation.component.css'],
})
export class QuestionCreationComponent {
  question: Question = {
    text: '',
    type: 'single-choice',
    options: [
      { text: '', isCorrect: false },
      { text: '', isCorrect: false },
      { text: '', isCorrect: false },
      { text: '', isCorrect: false },
    ],
    difficulty: 'medium',
    categorie: '' // Add the categorie field here

  };
  categories: any[] = []; // Add this property to store the categories


  selectedOptionIndex: number = 0; // Initialize with the first option selected for radio buttons

  selectedOptionIndices: number[] = []; // Initialize with an empty array for checkboxes

  constructor(private http: HttpClient, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.fetchCategories(); // Fetch categories when component initializes
  }


  fetchCategories() {
    const apiUrl = 'http://localhost:3000/categorie/all';
    this.http.get<any[]>(apiUrl).subscribe(
      (response) => {
        this.categories = response;
      },
      (error) => {
        console.error('Error fetching categories:', error);
      }
    );
  }

  addOption() {
    this.question.options.push({ text: '', isCorrect: false });
  }

  createQuestion() {
    // Remove empty options before sending the question to the server
    this.question.options = this.question.options.filter((option) => option.text.trim() !== '');

    // Ensure there are always four options
    while (this.question.options.length < 4) {
      this.question.options.push({ text: '', isCorrect: false });
    }

    const apiUrl = 'http://localhost:3000/questions';
    this.http.post<QuestionResponse>(apiUrl, this.question).subscribe(
      (response) => {
        console.log('Server Response:', response);

        const questionId = response._id;
        const quizId = this.route.snapshot.paramMap.get('quizId');
       // console.log('Quiz ID:', quizId);
       // console.log('Question ID:', questionId);

        if (quizId) {
          // Link the question to the quiz using PUT request
          this.linkQuizAndQuestion(quizId, questionId);
        } else {
          console.log('Quiz ID not available. Skipping linking process.');
        }

        // Clear the form after successful creation
        this.question = {
          text: '',
          type: 'single-choice',
          options: [
            { text: '', isCorrect: false },
            { text: '', isCorrect: false },
            { text: '', isCorrect: false },
            { text: '', isCorrect: false },
          ],
          difficulty: 'medium',
          categorie: '' // Add the categorie field here

        };
      },
      (error) => {
        console.error('Error creating question:', error);
      }
    );
  }

  linkQuizAndQuestion(quizId: string, questionId: string) {
    const quizUrl = `http://localhost:3000/quizzes/${quizId}`;
    this.http.get<{ data: Quiz }>(quizUrl).subscribe(
      (response) => {
        const quiz = response.data; // Extract the quiz object from the 'data' property
  
        console.log('Existing Quiz Data:', quiz);
        console.log('Quiz Q!!!!:', quiz.questions);
  
        if (!quiz) {
          console.log('Quiz not found. Cannot link the question.');
          return;
        }
  
        // Ensure the questions array exists in the quiz object
        if (!Array.isArray(quiz.questions)) {
          quiz.questions = [];
        }
  
        // Fetch the existing question IDs and add the new question ID
        const mergedQuestions = [...quiz.questions, questionId];
  
        // Prepare the payload with the merged questions array
        const payload = {
          ...quiz, // Include the existing properties of the quiz
          questions: mergedQuestions,
        };
  
        // Log the payload sent to the server
        console.log('Request Payload:', payload);
  
        // Update the quiz with the merged questions array
        this.http.put(quizUrl, payload).subscribe(
          (updatedQuiz) => {
            console.log('Quiz updated with linked question:', updatedQuiz);
          },
          (error) => {
            console.error('Error linking question to quiz:', error);
          }
        );
      },
      (error) => {
        console.error('Error fetching quiz data:', error);
      }
    );
  }
  
  
  
  

  setCorrectOption(index: number) {
    this.question.options.forEach((option, i) => (option.isCorrect = i === index));
  }

  toggleOptionSelection(index: number) {
    const option = this.question.options[index];
    option.isCorrect = !option.isCorrect;
  }
}
