import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SelectItemGroup } from 'primeng/api';
import { MultiSelectFilterOptions } from 'primeng/multiselect';
import { CategorieDto } from 'src/app/admin/interface/categorie.dto';
import { CategoryService } from 'src/app/admin/services/category.service';
import { Offer } from 'src/app/consultor/models/offer/offer.model';
import { OfferFormDataService } from 'src/app/consultor/services/offer/shared/offer-form-data.service';


@Component({
  selector: 'app-offer-details',
  templateUrl: './offer-details.component.html',
  styleUrls: ['./offer-details.component.scss']
})


export class OfferDetailsComponent implements OnInit {
  offerDetailsData: Partial<Offer> = this.offerFormDataService.getStepData('offerDetails');
  selectedJobs: string[] = [];


  categories: CategorieDto[] = [];
  groupedCategories: SelectItemGroup[] = [];
  groupedJobs: any[] = [];

  languagesss= [
    { label: 'French', value: 'French' },
    { label: 'English', value: 'English' },
    { label: 'Arabic', value: 'Arabic' },
    { label: 'Italian', value: 'Italian' },
    { label: 'Hindi', value: 'Hindi' },
    { label: 'Japanese', value: 'Japanese' },
    { label: 'Russian', value: 'Russian' },
    { label: 'Portuguese', value: 'Portuguese' },
    { label: 'Chinese', value: 'Chinese' },
    { label: 'Dutch', value: 'Dutch' },
    { label: 'Czech', value: 'Czech' },
    { label: 'Polish', value: 'Polish' }
];

typesOfPositions = [
  { value: 'CDI', label: 'CDI' },
  { value: 'CDD', label: 'CDD' },
  { value: 'SIVP', label: 'SIVP' },
  { value: 'Public Sector', label: 'Public Sector' },
  { value: 'Independent/Freelance', label: 'Independent/Freelance' },
  { value: 'Temporary', label: 'Temporary' },
  { value: 'Internship/PFE', label: 'Internship/PFE' },
  { value: 'Internship', label: 'Internship' },
  { value: 'Seasonal', label: 'Seasonal' }
];

  constructor(
    private offerFormDataService: OfferFormDataService,
    private router: Router, private categoryService: CategoryService
  ) {

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
  


  onSubmit(): void {
    this.offerFormDataService.updateStepData('offerDetails', this.offerDetailsData);    this.router.navigate(['/dashboardConsultor/Job-offer/offer-place']);
  }
  onBack(): void {
    this.router.navigate(['/dashboardConsultor/Job-offer/offer-info']);
  }
}
