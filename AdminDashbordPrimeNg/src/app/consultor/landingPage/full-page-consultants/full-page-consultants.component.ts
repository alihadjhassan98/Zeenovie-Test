import { Component } from '@angular/core';
import { ConsultantsService } from '../../services/consultants.service';
import { IConsultantWithRating } from '../highest-freelancer/highest-freelancer.component';

@Component({
  selector: 'app-full-page-consultants',
  templateUrl: './full-page-consultants.component.html',
  styleUrls: ['./full-page-consultants.component.scss']
})
export class FullPageConsultantsComponent {
  consultants: IConsultantWithRating[] = [];;
  isLoading!:boolean;
  constructor(private usersService: ConsultantsService) {
   
  }

  ngOnInit(): void {
    this.fetchConsultantsWithProDataAndImage();
  }

  async fetchConsultantsWithProDataAndImage() {
    this.isLoading = true;
    this.usersService.getConsultantsWithProDataAndImage().subscribe(
      data => {
        this.consultants = data.map(consultant => {
          console.log("hi",this.consultants)
          const ratings = consultant.ratings;
          const averageRating = ratings.length > 0
            ? ratings.reduce((sum, rating) => sum + rating.ratingValue, 0) / ratings.length
            : 0;
            console.log(averageRating)
          return { ...consultant, averageRating };
        });
  
        this.isLoading = false;
      },
      error => {
        console.error('Error fetching consultants with pro data and image:', error);
        this.isLoading = false;
      }
    );
  }
}
