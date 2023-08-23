import { Component, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { AuthService } from 'src/app/auth/services/auth.service';
import { TrainingsQualificationsDTO } from 'src/app/consultor/models/trainingQualification.model';
import { TrainingQualificationService } from 'src/app/consultor/services/training-qualification.service';

@Component({
  selector: 'app-add-training-qualifiications',
  templateUrl: './add-training-qualifiications.component.html',
  styleUrls: ['./add-training-qualifiications.component.scss']
})
export class AddTrainingQualifiicationsComponent {

  @Output() trainingAdded = new EventEmitter<TrainingsQualificationsDTO>();

  displayModal!: boolean;
  displayPosition!: boolean;
  position!: string;
  stateOptions!: any[];
  value1: string = "off";
  value2!: number;
  trainingQualificationForm: FormGroup;

  constructor(private trainingQualificationService: TrainingQualificationService,
    private messageService: MessageService, private authService: AuthService) {
    this.trainingQualificationForm = new FormGroup({



      typeOfDegree: new FormControl('', Validators.required),
      degreeObtained: new FormControl('', Validators.required),
      periodStart: new FormControl('', Validators.required),
      periodEnd: new FormControl('', Validators.required),
      country: new FormControl('', Validators.required),
      institution: new FormControl('', Validators.required),
      status: new FormControl('', Validators.required),
      grade: new FormControl('', Validators.required),
      description: new FormControl(''),




    });
  }
  ngOnInit() { }

  onSubmit() {
    if (this.trainingQualificationForm.valid) {
       console.log('Event emitted with data:', this.trainingQualificationForm.value);
       this.trainingAdded.emit(this.trainingQualificationForm.value);
       this.trainingQualificationForm.reset();
       this.displayModal=false
    } else {
       console.log('Form validation error');
       // Handle form validation errors
    }
 }
 

 isFieldInvalid(fieldName: string): boolean {
  const field = this.trainingQualificationForm.get(fieldName);
  const ok = !!(field && field.invalid && (field.dirty || field.touched));
  // console.log("the "+ fieldName +" variable contenus " + ok);
  return ok
}

  showModalDialog() {
    this.displayModal = true;
  }
  showPositionDialog(position: string) {
    this.position = position;
    this.displayPosition = true;
  }
  
  closeModal() {
  
    this.trainingQualificationForm.reset();
    this.displayModal = false;
    this.showPositionDialog('bottom');
  }
  
  closeButtomModal() {
    this.displayPosition = false;
    this.showPositionDialog('bottom');
  }
  closeAllModals() {
    this.displayModal=false
    this.displayPosition = false;
  }
}
