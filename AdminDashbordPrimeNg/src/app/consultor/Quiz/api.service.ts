import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = 'http://localhost:3000'; // Update with your API base URL

  constructor(private http: HttpClient) {}

  getAllUsers(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/auth/GetAllUsers`);
  }

  getUserSkills(userId: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/skills/findAllSkillsByIdUser/${userId}`);
  }

  getAllCategories(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/categorie/all`);
  }

  


  getQuestionsByCategoryIds(categoryIds: string[]): Observable<any> {
    const url = `${this.baseUrl}/questions/categorie/${categoryIds}`;
    return this.http.get(url);
  }

  generateQuiz(data: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/quizzes`, data);
  }
}
