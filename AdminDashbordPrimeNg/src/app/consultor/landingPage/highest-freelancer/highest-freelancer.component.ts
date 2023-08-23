import { Component, OnInit } from '@angular/core';
import { IUserswithProDataAndImage, IProfessionalData } from '../../models/consultants-with-his-Data.model';
import { ImageDTO } from '../../models/image.model';
import { ConsultantsService } from '../../services/consultants.service';
import { AuthService } from 'src/app/auth/services/auth.service';

export interface IConsultantWithRating extends IUserswithProDataAndImage {
  averageRating: number;
}
@Component({
  selector: 'app-highest-freelancer',
  templateUrl: './highest-freelancer.component.html',
  styleUrls: ['./highest-freelancer.component.scss']
})
export class HighestFreelancerComponent implements OnInit {
  consultants: IConsultantWithRating[] = [];
  responsiveOptions;
  isLoading!:boolean;
  constructor(private usersService: ConsultantsService) {
    this.responsiveOptions = [
      {
          breakpoint: '1024px',
          numVisible: 4,
          numScroll: 4
      },
      {
          breakpoint: '768px',
          numVisible: 2,
          numScroll: 2
      },
      {
          breakpoint: '560px',
          numVisible: 1,
          numScroll: 1
      }
  ];
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


