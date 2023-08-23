import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';


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
  selector: 'app-assigned-quiz-list',
  templateUrl: './assigned-quiz-list.component.html',
  styleUrls: ['./assigned-quiz-list.component.scss']
})
export class AssignedQuizListComponent implements OnInit {
  assignedQuizzes: Quiz[] = [];
  loggedInUserId: string | null;
  assignedToUsers: { [userId: string]: User } = {}; // Store user details by their ID
  companyId: string = ''; // Add this property

  


  constructor(private authService: AuthService, private http: HttpClient,private router: Router) {
    this.loggedInUserId = authService.getLoggedInUserId();

  }




  

  ngOnInit() {
    // Fetch assigned quizzes when the component is initialized
    this.fetchAssignedQuizzes();
    console.log('Company ID2:',this.companyId);


  }

  fetchCompanyDetails(companyId: string) {
    const companyUrl = `http://localhost:3000/auth/getUserById/${companyId}`; // Use the company ID as userId in the URL
    this.http.get<User>(companyUrl).subscribe(
      (companyData) => {
        this.assignedToUsers[companyId] = companyData; // Store company details using the company ID as the key
        console.log('Company Data:',companyData.username);
        this.companyId = companyId; // Set the companyId property

      },
      (error) => {
        console.error('Error fetching company details:', error);
      }
    );
  }
  



  fetchAssignedQuizzes() {
    const userId = this.loggedInUserId;
    const apiUrl = `http://localhost:3000/quizzes/assigned/${userId}`;
    
    this.http.get<{ data: Quiz[] }>(apiUrl).subscribe(
      (response) => {
        this.assignedQuizzes = response.data;
        const companyId = this.assignedQuizzes[0].IdUser;
        this.fetchCompanyDetails(companyId); // Fetch company details using the company ID
        
   
      },
      (error) => {
        console.error('Error fetching assigned quizzes:', error);
      }
    );
  }


  takeQuiz(quizId: string) {
    // Navigate to the quiz simulation page with the quiz ID as a parameter
    this.router.navigate(['/dashboardConsultor/quiz-simulation', quizId]);
  }
}
