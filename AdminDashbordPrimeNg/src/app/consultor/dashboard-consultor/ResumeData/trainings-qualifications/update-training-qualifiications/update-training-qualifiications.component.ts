import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { TrainingsQualificationsDTO } from 'src/app/consultor/models/trainingQualification.model';
import { TrainingQualificationService } from 'src/app/consultor/services/training-qualification.service';

@Component({
  selector: 'app-update-training-qualifiications',
  templateUrl: './update-training-qualifiications.component.html',
  styleUrls: ['./update-training-qualifiications.component.scss']
})
export class UpdateTrainingQualifiicationsComponent {

  displayModal!: boolean;
  displayPosition!: boolean;
  position!: string;
  stateOptions!: any[];
  value1: string = "off";
  value2!: number;
  @Input() trainingQualification!: TrainingsQualificationsDTO;
  @Output() trainingUpdated = new EventEmitter<void>();

  trainingQualificationForm: FormGroup;

  constructor(private trainingQualificationService: TrainingQualificationService, 
              private messageService: MessageService) { 
    this.trainingQualificationForm = new FormGroup({
      _id: new FormControl(''),
   
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

  ngOnInit() {
    this.trainingQualificationForm.patchValue(this.trainingQualification);
  }

  onSubmit() {
    const id = this.trainingQualificationForm.get('_id')?.value;
    if (!id) {
      console.error('No logged-in user found');
      return;
    }
    this.trainingQualificationService.updateTrainingQualificationById(this.trainingQualificationForm.value, id).subscribe(
      (updatedTrainingQualification) => {
        console.log(updatedTrainingQualification);
        this.messageService.add({severity:'success', summary: 'Successful', detail:'Training qualification updated Successfully', life: 3000});
        this.trainingUpdated.emit();
        this.displayModal=false
      },
      (error) => {
        console.error(error);
      }
    );
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.trainingQualificationForm.get(fieldName);
    const ok = !!(field && field.invalid && (field.dirty || field.touched));
    // console.log("the "+ fieldName +" variable contenus " + ok);
    return ok
  }
  loadTrainingQualification(trainingQualification: TrainingsQualificationsDTO) {
    this.trainingQualification = trainingQualification;
    this.trainingQualificationForm.patchValue(this.trainingQualification);
  }
  showModalDialog() {
    this.trainingQualificationForm.patchValue({
      ...this.trainingQualification,
      periodStart : this.formatDate(this.trainingQualification.periodStart),
      periodEnd: this.formatDate(this.trainingQualification.periodEnd)
    }); // Populate the form
    this.displayModal = true;
}

formatDate(date: Date): string {
    const d = new Date(date);
    let month = '' + (d.getMonth() + 1);
    let day = '' + d.getDate();
    const year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [year, month, day].join('-');
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
