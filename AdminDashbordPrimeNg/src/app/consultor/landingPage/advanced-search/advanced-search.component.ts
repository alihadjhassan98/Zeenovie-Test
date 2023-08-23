import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SelectItemGroup } from 'primeng/api';
import { CategorieDto } from 'src/app/admin/interface/categorie.dto';
import { CategoryService } from 'src/app/admin/services/category.service';
import { data } from 'src/app/utils/data';
import { SearchOffersDto } from '../../models/offer/SearchOffersDto.model';
import { JobOfferService } from '../../services/offer/job-offer.service';
import { SearchResultsService } from '../../services/offer/shared/search-results.service';

@Component({
  selector: 'app-advanced-search',
  templateUrl: './advanced-search.component.html',
  styleUrls: ['./advanced-search.component.scss']
})
export class AdvancedSearchComponent {
  countries = data;
  offer=new SearchOffersDto(); 
  selectedJobs: string[] = [];


  categories: CategorieDto[] = [];
  groupedCategories: SelectItemGroup[] = [];
  groupedJobs: any[] = [];



   typesOfPositions: any[] = [
    { label: 'CDI', value: 'CDI' },
    { label: 'CDD', value: 'CDD' },
    { label: 'SIVP', value: 'SIVP' },
    { label: 'Public Sector', value: 'Public Sector' },
    { label: 'Independent/Freelance', value: 'Independent/Freelance' },
    { label: 'Temporary', value: 'Temporary' },
    { label: 'Internship/PFE', value: 'Internship/PFE' },
    { label: 'Internship', value: 'Internship' },
    { label: 'Seasonal', value: 'Seasonal' }
];

  constructor(
    private offerService: JobOfferService,private categoryService: CategoryService,
    private router: Router,private searchResultsService: SearchResultsService
  ) {}

  keys(obj: object): string[] {
    return Object.keys(obj);
  }
  onSelectCountry(): void {
    if (this.offer.Address !== 'Tunisia') {
      this.offer.Region = '';
      this.offer.City = '';
    }
  }



  searchOffers(): void {
    this.offerService.searchOffers(this.offer).subscribe(results => {
      this.searchResultsService.setSearchResults(results);
      // Navigate to the search results page
      this.router.navigate(['/home/full-page-jobs']);
    });
  }
  ngOnInit(): void {
    this.fetchCategories();
  }

  fetchCategories(): void {
    this.categoryService.getAllCategories().subscribe((data) => {
      const categories = data.filter(category => !category.Parent);
      this.groupedJobs = categories.map(category => {
        const group = {
          label: category.title,
          items: category.childrens?.map(child => ({ label: child.title, value: child.title })) || []
        };
        return group;
      });
    });
  }

  getCities(country: string, region: string): string[] {
    const countryData = (this.countries as {[key: string]: any})[country];
    return countryData?.[region]?.cities || [];
  }
}
