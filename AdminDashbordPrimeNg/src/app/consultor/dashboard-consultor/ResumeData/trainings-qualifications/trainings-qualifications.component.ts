import { AuthService } from 'src/app/auth/services/auth.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { PrimeNGConfig, MessageService, Message, ConfirmationService } from 'primeng/api';
import { TrainingQualificationService } from 'src/app/consultor/services/training-qualification.service';
import { TrainingsQualificationsDTO } from 'src/app/consultor/models/trainingQualification.model';
import { AddTrainingQualifiicationsComponent } from './add-training-qualifiications/add-training-qualifiications.component';
import { UpdateTrainingQualifiicationsComponent } from './update-training-qualifiications/update-training-qualifiications.component';

@Component({
  selector: 'app-trainings-qualifications',
  templateUrl: './trainings-qualifications.component.html',
  styleUrls: ['./trainings-qualifications.component.scss']
})
export class TrainingsQualificationsComponent implements OnInit {
  isEditing: boolean = false;
  displayModal!: boolean;
  displayPosition!: boolean;
  position!: string;
  stateOptions!: any[];
  messages!: Message[];
  trainingsQualifications: TrainingsQualificationsDTO[] = [];
  @ViewChild(AddTrainingQualifiicationsComponent)private addTrainingComponent!: AddTrainingQualifiicationsComponent;
  @ViewChild(UpdateTrainingQualifiicationsComponent)private UpdateTrainingComponent!: UpdateTrainingQualifiicationsComponent;
   selectedTraining!: TrainingsQualificationsDTO;

  constructor(private primengConfig: PrimeNGConfig,private trainingQualificationService: TrainingQualificationService,
    private authService :AuthService,private messageService: MessageService,
    private confirmationService: ConfirmationService) { 

    }
  ngOnInit() {
    this.messages = [
      { severity: 'info', summary: 'Info', detail: 'You havent figured out your Trainings ' },
    ];
    this.primengConfig.ripple = true;
    this.loadTrainingsQualifications()
  }

  openModalForCreate() {
    this.isEditing = false;
    this.addTrainingComponent.showModalDialog();
  }
  openModalForUpdate(trainingQualification: TrainingsQualificationsDTO) {
    this.isEditing = true;
    this.UpdateTrainingComponent.loadTrainingQualification(trainingQualification);
    this.UpdateTrainingComponent.showModalDialog();
  }
  
  confirmDelete(item: TrainingsQualificationsDTO) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete this training qualification?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.deleteTrainingQualification(item);
        this.loadTrainingsQualifications()
      }
    });
  }

  deleteTrainingQualification(item: TrainingsQualificationsDTO) {
    this.trainingQualificationService.deleteTrainingQualificationByUserId(item._id).subscribe(
      () => {
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Training qualification deleted Successfully', life: 3000 });
        this.loadTrainingsQualifications(); // Reload trainings qualifications after deleting one
      },
      (error) => {
        console.error(error);
      }
    );
  }
  


  
  



  loadTrainingsQualifications() {
    const userId = this.authService.getLoggedInUserId();
    if (!userId) {
      console.error('No logged-in user found');
      return;
    }
    this.trainingQualificationService.getAllTrainingQualificationByUserId(userId).subscribe((data) => {
      this.trainingsQualifications=data; 
      console.log(this.trainingsQualifications)
      },
    );
  }

  createTrainingQualification(training: TrainingsQualificationsDTO) {
    console.log('Event received in parent with data:', training);
    const token = this.authService.getToken();
    this.trainingQualificationService.createTrainingQualification(training, token).subscribe((createdTrainingQualification) => {
        console.log(createdTrainingQualification);
        this.messageService.add({severity:'success', summary: 'Successful', detail:'Training qualification created Successfully', life: 3000});
        this.loadTrainingsQualifications(); 
        
      },
    );
    
  }
}
