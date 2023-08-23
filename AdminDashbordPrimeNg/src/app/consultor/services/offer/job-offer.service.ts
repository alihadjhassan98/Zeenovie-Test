import { Injectable } from '@angular/core';
import { Offer } from '../../models/offer/offer.model';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { AuthService } from 'src/app/auth/services/auth.service';
import { SearchOffersDto } from '../../models/offer/SearchOffersDto.model';

@Injectable({
  providedIn: 'root'
})
export class JobOfferService {
  private apiUrl = 'http://localhost:3000/offer';
  private apibaseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient, private authService: AuthService) { }


  getUserDataForRecommendation(userId: string): Observable<any> {
    return this.http.get<any>(`${this.apibaseUrl}/offer-recommandation/getUserDataForRecommendation/${userId}`);
  }

  getAllOfferByUserId(IdUser: string): Observable<Offer[]> {
    return this.http.get<Offer[]>(`${this.apiUrl}/findAllOfferByIdUser/${IdUser}`);
  }
  createOffer(dto: Partial<Offer>, token: string): Observable<Offer> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      }),
    }
    return this.http.post<Offer>(`${this.apiUrl}/createOffer`, dto, httpOptions);
  }

  getAllOfferspagination(page: number, rows: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/getAllofferswithpagination?page=${page}&rows=${rows}`);
  }
  
  getAllOffers(): Observable<Offer[]> {
    return this.http.get<Offer[]>(`${this.apiUrl}/getAlloffers`);
  }




  updateOffer(langedata: Offer, id: string): Observable<Offer> {
    return this.http.put<Offer>(`${this.apiUrl}/updateOfferById/${id}`, langedata);
  }


  deleteOffer(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/removeOfferById/${id}`);
  }

  getOfferId(IdUser: string): Observable<Offer> {
    return this.http.get<Offer>(`${this.apiUrl}/getOfferbyId/${IdUser}`);
  }

  searchOffers(searchFilters: SearchOffersDto): Observable<any> {
    const searchUrl = `${this.apiUrl}/search-offers`; // Replace with the appropriate API endpoint
    return this.http.post(searchUrl, searchFilters);
  }

}
