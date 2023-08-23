import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { AuthService } from 'src/app/auth/services/auth.service';
import { ProfessionalExperienceDTO } from 'src/app/consultor/models/pro-experience.model';
import { ProExperienceService } from 'src/app/consultor/services/pro-experience.service';

@Component({
  selector: 'app-update-pro-experience',
  templateUrl: './update-pro-experience.component.html',
  styleUrls: ['./update-pro-experience.component.scss']
})
export class UpdateProExperienceComponent {
  displayModal!: boolean;
  displayPosition!: boolean;
  position!: string;
  stateOptions!: any[];
  value1: string = "off";
  value2!: number;
  proexperienceForm: FormGroup;
  @Input() proexperience!: ProfessionalExperienceDTO;
  @Output() ProExpUpdated = new EventEmitter<void>();

  constructor(private proExpService :ProExperienceService,
    private messageService: MessageService, private authService: AuthService) {
      
    this.proexperienceForm = new FormGroup({
      _id: new FormControl(''),
      showPeriodEnd :new FormControl(''),
      Period: new FormControl('', Validators.required),
      Until: new FormControl(''),
      JobTitle: new FormControl('', Validators.required),
      JobType: new FormControl('', Validators.required),
      Employer: new FormControl('', Validators.required),
      Workplace: new FormControl('', Validators.required),
      Industry: new FormControl('', Validators.required),
      CompanySize: new FormControl('', Validators.required),
      CompanyCategory: new FormControl('', Validators.required),
      MonthlyNetSalary: new FormControl(''),
      TasksAndMissions: new FormControl(''),


    });
  }
  ngOnInit() {
    this.proexperienceForm.patchValue(this.proexperience);
  }

  onSubmit() {
    const id = this.proexperienceForm.get('_id')?.value;
    if (!id) {
      console.error('No logged-in user found');
      return;
    }
    this.proExpService.updateProfessionalExperiencenById(this.proexperienceForm.value, id).subscribe(
      (updatedTrainingQualification) => {
        console.log(updatedTrainingQualification);
        this.messageService.add({severity:'success', summary: 'Successful', detail:'Training qualification updated Successfully', life: 3000});
        this.ProExpUpdated.emit();
        this.displayModal=false
      },
      (error) => {
        console.error(error);
      }
    );
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.proexperienceForm.get(fieldName);
    const ok = !!(field && field.invalid && (field.dirty || field.touched));
    // console.log("the "+ fieldName +" variable contenus " + ok);
    return ok
  }
  loadTrainingProExperience(proexperience: ProfessionalExperienceDTO) {
    this.proexperience = proexperience;
    this.proexperienceForm.patchValue(this.proexperience);
  }
  showModalDialog() {
    this.proexperienceForm.patchValue({
      ...this.proexperience,
      Period : this.formatDate(this.proexperience.Period),
      Until: this.formatDate(this.proexperience.Until)
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
  
    this.proexperienceForm.reset();
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
