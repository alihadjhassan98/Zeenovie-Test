
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CommentResponse } from 'src/app/consultor/models/feedbacks/CommentResponse.model';
import { Comments } from 'src/app/consultor/models/feedbacks/comments.model';


@Injectable({
  providedIn: 'root'
})
export class CommentService {
  private apiUrl = 'http://localhost:3000/comments';

  constructor(private http: HttpClient) {}

  getAllCommentsById(userId: string) {
    return this.http.get<Comments[]>(`${this.apiUrl}/findAllCommentByIdUser/${userId}`);
  }

  createComment(comment: Comments) {
    return this.http.post<Comments>(`${this.apiUrl}/create`, comment);
  }

  getAllCommentswithCompanyDataAndImage(userId: string): Observable<CommentResponse[]> {
    return this.http.get<CommentResponse[]>(`${this.apiUrl}/withCompanyDataAndImage/${userId}`);
  }

  likeComment(commentId: string, userId: string): Observable<Comments> {
    return this.http.post<Comments>(`${this.apiUrl}/like/${commentId}`, { userId });
  }
  
  unlikeComment(commentId: string, userId: string): Observable<Comments> {
    return this.http.post<Comments>(`${this.apiUrl}/unlike/${commentId}`, { userId });
  }
}
