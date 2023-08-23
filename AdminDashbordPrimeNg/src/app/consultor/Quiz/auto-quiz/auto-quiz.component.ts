import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service'; // Replace with your API service
import { AuthService } from 'src/app/auth/services/auth.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auto-quiz',
  templateUrl: './auto-quiz.component.html',
  styleUrls: ['./auto-quiz.component.scss']
})
export class AutoQuizComponent implements OnInit {
  consultants: any[] = [];
  selectedConsultant: string | null = null;
  selectedConsultantSkills: any[] = [];
  selectedSkills: { [skillId: string]: boolean } = {};
  categories: any[] = [];
  loggedInUserId: string | null;


  constructor(private apiService: ApiService,private authService: AuthService,private http: HttpClient,private router: Router) { 
    this.loggedInUserId = authService.getLoggedInUserId();

  }




  ngOnInit(): void {
    this.fetchConsultants();
    this.fetchCategories();
  }

  async fetchConsultants(): Promise<void> {
    try {
      const response = await this.apiService.getAllUsers().toPromise();
      this.consultants = response;
      console.log('Consultants:', this.consultants);
    } catch (error) {
      console.error('Error fetching consultants:', error);
    }
  }

  async fetchCategories(): Promise<void> {
    try {
      const response = await this.apiService.getAllCategories().toPromise();
      this.categories = response;
      console.log('Categories:', this.categories);
      
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  }

  async fetchConsultantSkills(userId: string): Promise<void> {
    try {
      console.log('User ID1:', userId);

      const consultantSkills = await this.apiService.getUserSkills(userId).toPromise();
      this.selectedConsultantSkills = consultantSkills;
      this.selectedSkills = {}; // Clear previous selections
    } catch (error) {
      console.error('Error fetching consultant skills:', error);
    }
  }

  async generateQuiz(): Promise<void> {
    if (!this.selectedConsultant) {
      console.log('Please select a consultant before generating a quiz.');
      return;
    }
  
    try {
      console.log('User ID2:', this.selectedConsultant);
  
      this.fetchConsultantSkills(this.selectedConsultant);
  
      const consultantSkills = await this.apiService.getUserSkills(this.selectedConsultant).toPromise();
      console.log('Consultant Skills:', consultantSkills);
  
      const matchingCategories = this.categories.filter((category: any) =>
        consultantSkills.some((skill: any) => skill.competence === category.title)
      );
  
      console.log('Matching Categories:', matchingCategories);
  
      for (const category of matchingCategories) {
        console.log('Category IDDDD:', category._id);
        const categoryUrl = `http://localhost:3000/questions/categorie/${category._id}`;
  
        console.log('Fetching questions for category:', category.title);
  
        const matchingQuestions = await this.http.get<any>(categoryUrl).toPromise();
  
        console.log('Matching Questions:', matchingQuestions);
  
        const questionIds = matchingQuestions.map((question: any) => question._id);
  
        const userId = this.loggedInUserId;
        console.log('Matching Questions IDs:', questionIds);
        console.log('User ID:', userId);
  
        const quizData = {
          title: 'Auto-generated Quiz',
          description: 'Quiz generated based on consultant skills',
          questions: questionIds,
          assignedTo: [this.selectedConsultant],
          IdUser: this.loggedInUserId,
          timer: 10,
        };
  
        const response = await this.apiService.generateQuiz(quizData).toPromise();
  
        console.log('Quiz generated:', response);
      }

     // Show loading screen (navigate) and then navigate to the next page
    this.router.navigate(['/dashboardConsultor/loading']);

    setTimeout(() => {
      this.router.navigate(['/dashboardConsultor/quizzes']);
    }, 1000); // 1000 milliseconds = 1 second

    } catch (error) {
      console.error('Error generating quiz:', error);
    }
  }
  
  
}
