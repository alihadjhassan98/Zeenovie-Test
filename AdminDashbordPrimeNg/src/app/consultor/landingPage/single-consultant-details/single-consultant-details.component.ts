import { ChangeDetectorRef, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';
import { ProfessionalData } from '../../models/ProfessionalData.model';
import { ImageDTO } from '../../models/image.model';
import { LanguageDTO } from '../../models/langues.model';
import { ProfessionalExperienceDTO } from '../../models/pro-experience.model';
import { SkillsDTO } from '../../models/skills.model';
import { TrainingsQualificationsDTO } from '../../models/trainingQualification.model';
import { ImageService } from '../../services/image.service';
import { LanguagesService } from '../../services/languages.service';
import { PersonalDataService } from '../../services/personal-data.service';
import { ProExperienceService } from '../../services/pro-experience.service';
import { ProfessionalDataService } from '../../services/professional-data.service';
import { SkillsService } from '../../services/skills.service';
import { TrainingQualificationService } from '../../services/training-qualification.service';
import { Comments } from '../../models/feedbacks/comments.model';
import { CommentService } from '../../services/feedbacks/comments/comments.service';
import { CommentResponse } from '../../models/feedbacks/CommentResponse.model';
import { PersonalDataDTO } from '../../models/personal-data.model';
import { Ratingss } from '../../models/feedbacks/ratings.model';
import { RatingsService } from '../../services/feedbacks/ratings/ratings.service';

@Component({
  selector: 'app-single-consultant-details',
  templateUrl: './single-consultant-details.component.html',
  styleUrls: ['./single-consultant-details.component.scss']
})
export class SingleConsultantDetailsComponent {
  image!: ImageDTO;
  languages: LanguageDTO[] = [];
  professionaldata!: ProfessionalData;
  proexperience: ProfessionalExperienceDTO[] = [];
  newProExperience = new ProfessionalExperienceDTO();
  skills: SkillsDTO[] = [];
  personalData!:PersonalDataDTO;
  trainingsQualifications: TrainingsQualificationsDTO[] = [];
  skillslength!: number;
  additionaldatalength!: number;
  proexperiencelength!: number;
  languageslength!: number;
  trainquallength!: number;
  comments: CommentResponse[] = [];
  commentssingle: Comments[] = [];
  newCommentContent: string = '';
  consultantRatings: Ratingss[] = [];
  averageRating = 0;
  likeduserid!: string | null;
  ratingValue: number = 0;

  constructor(private imageService: ImageService, public authService: AuthService, private personalDataService: PersonalDataService,
    private proexpService: ProExperienceService, private prosevices: ProfessionalDataService, private skillsService: SkillsService,
    private trainingQualificationService: TrainingQualificationService,
    private LanguageService: LanguagesService, private activatedRoute: ActivatedRoute,
    private commentService: CommentService,private ratingService: RatingsService,
  ) {

  }
  ngOnInit(): void {
    this.loadComments();
    this.likeduserid = this.authService.getLoggedInUserId();
    // this.getUserEmail().subscribe(email => {
    //   this.email = email;
    // });
    // this.getUserId();
    this.loadSkills();
    this.DataCharger();
    this.loadProfessionalExperiences();
    this.loadUserDataAndImage();
    this.getPersonalDataByUserId();
    this.loadTrainingsQualifications();
    this.getRatingsByConsultant();

    this.loadLaguages();
  }

  getUserId(): string {
    let userId;

    if (this.activatedRoute.snapshot.params['id'] ) {
      userId = this.activatedRoute.snapshot.params['id'];
      console.log(" userId from activated route ", userId);
    } else {
      userId = this.authService.getLoggedInUserId();
      console.log(" userId from services  ", userId);

    }

    return userId;
  }

  getRatingsByConsultant(): void {
    const consultantId = this.getUserId();
    console.log("user id works ", consultantId);
    if (!consultantId) {
      console.error('No logged-in user found');
      return;
    }
    this.ratingService.getRatingsByConsultantId(consultantId).subscribe((ratings) => {
      this.consultantRatings = ratings;
      this.consultantRatings.forEach(consultant => {
         this.ratingValue = consultant.ratingValue; 
      });
      this.calculateAverageRating();

    });
  }

  calculateAverageRating(): void {
    if(this.consultantRatings.length > 0) {
      const sum = this.consultantRatings.reduce((acc, rating) => acc + rating.ratingValue, 0);
      this.averageRating = parseFloat((sum / this.consultantRatings.length).toFixed(1));
    } else {
      this.averageRating = 0;  // or any other default value
    }
  }
  
  submitRating(event: any): void {
    const ratedId = this.activatedRoute.snapshot.params['id'];
    const userId = this.authService.getLoggedInUserId();

    if (!ratedId || !userId) {
      console.error('No logged-in user found');
      return;
    }
    const ratingValue = event.value;
    this.ratingService.createRating(ratedId, userId, ratingValue).subscribe(
      (newRating) => {
        console.log('Rating submitted:', newRating);
      },
      (error) => {
        console.error('Error submitting rating:', error);
      }
    );
  }

  loadComments(): void {
    const userIdFromRoute = this.activatedRoute.snapshot.params['id'];
    if (userIdFromRoute) {
      this.commentService
        .getAllCommentswithCompanyDataAndImage(userIdFromRoute)
        .subscribe(
          (comments) => {
            this.comments = comments;
            console.log(this.comments)
          },
          (error) => {
            console.error('Error loading comments:', error);
          }
        );
    }
  }
  

  addComment(): void {
    const userIdFromRoute = this.activatedRoute.snapshot.params['id'];
    const entrepriseId = this.authService.getLoggedInUserId();
  
    if (!userIdFromRoute || !entrepriseId) {
      console.error('No logged-in user found');
      return;
    }
    const newComment: any = {
      IdUser: userIdFromRoute,
      entrepriseId: entrepriseId,
      likes: 0,
      content: this.newCommentContent,
      commentedAt: new Date(),
      status: 'active',
      likedBy: []
    };
    this.commentService.createComment(newComment).subscribe((comment) => {
      this.commentssingle.push(comment);
      this.newCommentContent = '';
      this.loadComments();
    });
  }

  // isLikedByCurrentUser(comment: Comments): boolean {
  //   const userId = this.authService.getLoggedInUserId();*

  //       if (!userId) {
  //     console.error('No logged-in user found');
  //     return;
  //   }
    
  //   return comment.likedBy.includes(userId);
  // }
  
  toggleLike(comment: CommentResponse): void {
    const userId = this.authService.getLoggedInUserId();
    if (!userId) {
      console.error('No logged-in user found');
      return;
    }
  
    if (comment.likedBy.includes(userId)) {
      // If the user has already liked the comment, unlike it
      this.commentService.unlikeComment(comment._id, userId).subscribe((updatedComment) => {
        comment.likes = updatedComment.likes;
        comment.likedBy = updatedComment.likedBy;
      });
    } else {
      // If the user hasn't liked the comment yet, like it
      this.commentService.likeComment(comment._id, userId).subscribe((updatedComment) => {
        comment.likes = updatedComment.likes;
        comment.likedBy = updatedComment.likedBy;
      });
    }
  }

  loadLaguages() {
    // const userId = this.authService.getLoggedInUserId();
    const userId = this.getUserId();
    console.log("user id works ", userId);
    if (!userId) {
      console.error('No logged-in user found');
      return;
    }
    this.LanguageService.getAllLanguageDTOByUserId(userId).subscribe((data) => {
      console.log('Data loaded:', data);
      this.languages = data;
      this.languageslength = this.languages.length;
      console.log('Data loaded:', data);



      //console.log(this.languages)
    },
    );
  }

  loadTrainingsQualifications() {
    //  const userId = this.authService.getLoggedInUserId();
    const userId = this.getUserId();

    if (!userId) {
      console.error('No logged-in user found');
      return;
    }
    this.trainingQualificationService.getAllTrainingQualificationByUserId(userId).subscribe((data) => {
      this.trainingsQualifications = data;
      this.trainquallength = this.trainingsQualifications.length;
      console.log(this.trainingsQualifications)
    },
    );
  }

  loadSkills() {
    // const userId = this.authService.getLoggedInUserId();
    const userId = this.getUserId();

    if (!userId) {
      console.error('No logged-in user found');
      return;
    }
    this.skillsService.getAllSkillsDTOByUserId(userId).subscribe((data) => {
      this.skills = data;
      this.skillslength = this.skills.length;
      //console.log(this.skills)
    },
    );
  }
  DataCharger() {
    //change this from services
    const userId = this.getUserId();

    if (!userId) {
      console.error('No logged-in user found');
      return;
    }

    this.prosevices.FindProfessionalDataById(userId).subscribe((pro) => {
      console.log(pro);
      this.professionaldata = pro;
   

    })
  }
  loadProfessionalExperiences() {
    // const userId = this.authService.getLoggedInUserId();
    const userId = this.getUserId();

    if (!userId) {
      console.error('No logged-in user found');
      return;
    }
    this.proexpService.getAllProfessionalExperienceByUserId(userId).subscribe((data) => {
      this.proexperience = data;
      this.proexperiencelength = this.proexperience.length;
    },
    );
  }

  getPersonalDataByUserId() {
    //  const userId = this.authService.getLoggedInUserId();
    const userId = this.getUserId();

    if (!userId) {
      console.error('No logged-in user found');
      return;
    }
    this.personalDataService.getPersonalDataByUserId(userId).subscribe((data) => {
      this.personalData = data;
      // if (this.personalData) {
      //   this.numberOfPersonaldata = 1;
      // }
    });
  }

  loadUserDataAndImage(): void {
    // const loggedInUserId = this.authService.getLoggedInUserId();
    const userId = this.getUserId();

    if (!userId) {
      console.error('No logged-in user found');
      return;
    }
    this.imageService.loadImageByUserId(userId).subscribe((data) => {
      this.image = data;
    },
      (error) => {
        console.error('Error loading image:', error);
      });
  }
  


}