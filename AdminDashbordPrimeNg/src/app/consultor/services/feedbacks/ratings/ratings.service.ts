import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Rating } from 'primeng/rating';
import { Observable } from 'rxjs';
import { Ratingss } from 'src/app/consultor/models/feedbacks/ratings.model';

@Injectable({
  providedIn: 'root'
})
export class RatingsService {
  private baseUrl = 'http://localhost:3000/ratings';
  constructor(private http: HttpClient) {}

  createRating(consultantId: string, userId: string, ratingValue: number): Observable<Ratingss> {
    return this.http.post<Ratingss>(this.baseUrl, { consultantId, userId, ratingValue });
  }

  getRatingsByConsultantId(consultantId: string): Observable<Ratingss[]> {
    return this.http.get<Ratingss[]>(`${this.baseUrl}/ratings/${consultantId}`);
  }
  
}
