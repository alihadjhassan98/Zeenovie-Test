import { LanguagesService } from './../../../services/languages.service';
import { AdditionalDataService } from './../../../services/additional-data.service';
import { ProfessionalDataService } from './../../../services/professional-data.service';
import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';
import { ImageDTO } from 'src/app/consultor/models/image.model';
import { LanguageDTO } from 'src/app/consultor/models/langues.model';
import { PersonalDataDTO } from 'src/app/consultor/models/personal-data.model';
import { ProfessionalExperienceDTO } from 'src/app/consultor/models/pro-experience.model';
import { ImageService } from 'src/app/consultor/services/image.service';
import { PersonalDataService } from 'src/app/consultor/services/personal-data.service';
import { ProExperienceService } from 'src/app/consultor/services/pro-experience.service';
import { ProfessionalData } from 'src/app/consultor/models/ProfessionalData.model';
import { SkillsService } from 'src/app/consultor/services/skills.service';
import { SkillsDTO } from 'src/app/consultor/models/skills.model';
import { TrainingQualificationService } from 'src/app/consultor/services/training-qualification.service';
import { TrainingsQualificationsDTO } from 'src/app/consultor/models/trainingQualification.model';
import { AdditionalDataDTO } from 'src/app/consultor/models/additional-data.model';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import { ActivatedRoute } from '@angular/router';
import { Observable, map, of } from 'rxjs';

@Component({
  selector: 'app-cvplatforme',
  templateUrl: './cvplatforme.component.html',
  styleUrls: ['./cvplatforme.component.scss','./reset-fonts-grids.css']
})
export class CVPlatformeComponent implements OnInit {
  numberOfPersonaldata: number = 0;
  newPersonalData = new PersonalDataDTO();
  personalData!: PersonalDataDTO;
  image!: ImageDTO;
  languages: LanguageDTO[] = [];
  newLanguages = new LanguageDTO();
  professionaldata!: ProfessionalData;
  proexperience: ProfessionalExperienceDTO[] = [];
  newProExperience = new ProfessionalExperienceDTO();
  skills: SkillsDTO[] = [];
  trainingsQualifications: TrainingsQualificationsDTO[] = [];
  additionaldata: AdditionalDataDTO[] = [];
  skillslength!: number;
  additionaldatalength!: number;
  proexperiencelength!: number;
  languageslength!: number;
  trainquallength!: number;
  isDownloading: boolean = false;
  userId: string | undefined;
  email!: string;
  constructor(private imageService: ImageService, public authService: AuthService, private personalDataService: PersonalDataService,
    private proexpService: ProExperienceService, private prosevices: ProfessionalDataService, private skillsService: SkillsService,
    private trainingQualificationService: TrainingQualificationService, private AdditionalDataService: AdditionalDataService,
    private LanguageService: LanguagesService, private activatedRoute: ActivatedRoute,
    private cdr: ChangeDetectorRef,
  ) {

  }

  ngOnInit(): void {

    this.getUserEmail().subscribe(email => {
      this.email = email;
    });
    // this.getUserId();
    this.loadSkills();
    this.DataCharger();
    this.loadProfessionalExperiences();
    this.loadUserDataAndImage();
    this.getPersonalDataByUserId();
    this.loadTrainingsQualifications();
    this.loadAdiitionalInfos();
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
  getUserEmail(): Observable<string> {
    let email$: Observable<string>;
  
    if (this.activatedRoute.snapshot.params['id'] && this.authService.getLoggedInUserId()) {
      email$ = this.authService.getUserById(this.activatedRoute.snapshot.params['id']).pipe(map(user => user.email));
     // convert string to Observable
      console.log(" Email from authService ");
    } else {
      email$ = of(this.authService.emailUser);
    }
  
    return email$;
  }
  
  



  //   downloadAsPDF(): void {
  //     const pdfName = 'CV.pdf';
  //     const element = document.body;

  //     html2canvas(element).then((canvas) => {
  //       const imgData = canvas.toDataURL('image/png');
  //       const pdf = new jsPDF('p', 'mm', 'a4');
  //       const imgProps = pdf.getImageProperties(imgData);
  //       const pdfWidth = pdf.internal.pageSize.getWidth();
  //       const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
  //       pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
  //       pdf.save(pdfName);
  //     });


  // }

  downloadAsPDF() {
    this.isDownloading = true;
    const resumeElement = document.getElementById('resume-content');
    if (!resumeElement) {
      console.error('Resume content not found');
      this.isDownloading = false;
      return;
    }
    const pdf = new jsPDF('p', 'mm', 'a4');
    const canvas = html2canvas(resumeElement, {
      scale: 5,
      backgroundColor: 'white'
    });

    canvas
      .then((canvas: any) => {
        const imgData = canvas.toDataURL('image/png');
        const bufferX = 15;
        const bufferY = 10;
        const imgProps = (pdf as any).getImageProperties(imgData);
        const pdfWidth = pdf.internal.pageSize.getWidth() - 2 * bufferX;
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

        pdf.addImage(imgData, 'PNG', bufferX, bufferY, pdfWidth, pdfHeight, undefined, 'FAST');
        return pdf;
      })
      .then((pdf: any) => {
        pdf.save(`${this.personalData.Name}_Resume.pdf`);
      })
      .finally(() => {
        this.isDownloading = false;
      });
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



      this.cdr.detectChanges();
      //console.log(this.languages)
    },
    );
  }

  loadAdiitionalInfos() {
    // const userId = this.authService.getLoggedInUserId();
    const userId = this.getUserId();

    if (!userId) {
      console.error('No logged-in user found');
      return;
    }
    this.AdditionalDataService.getAllAdditionalDataByUserId(userId).subscribe((data) => {
      this.additionaldata = data;
      this.additionaldatalength = this.additionaldata.length;
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
      this.cdr.detectChanges();

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
      if (this.personalData) {
        this.numberOfPersonaldata = 1;
      }
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
