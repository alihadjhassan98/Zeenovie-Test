
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Offer } from 'src/app/consultor/models/offer/offer.model';

@Injectable({
  providedIn: 'root'
})
export class SearchResultsService {
    private searchResultsSource = new BehaviorSubject<Offer[]>([]);
    searchResults$ = this.searchResultsSource.asObservable();
  
    setSearchResults(results: Offer[]): void {
      this.searchResultsSource.next(results);
    }
}
