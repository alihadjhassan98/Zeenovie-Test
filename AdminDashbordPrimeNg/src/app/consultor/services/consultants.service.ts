import { Injectable } from '@angular/core';
import { IProfessionalData, IUserswithProDataAndImage, ImageDTO } from '../models/consultants-with-his-Data.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConsultantsService {

  private readonly apiUrl = 'http://localhost:3000/auth'; // Replace with the URL of your Nest.js API

  constructor(private http: HttpClient) {}

  getConsultantsWithProDataAndImage(): Observable<IUserswithProDataAndImage[]> {
    const url = `${this.apiUrl}/consultants/withProDataAndImage`;
    return this.http.get<  IUserswithProDataAndImage[]>(url);
  }

  
}
