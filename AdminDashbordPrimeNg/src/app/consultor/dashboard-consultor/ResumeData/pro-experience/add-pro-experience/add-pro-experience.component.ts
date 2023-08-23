import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { AuthService } from 'src/app/auth/services/auth.service';
import { ProfessionalExperienceDTO } from 'src/app/consultor/models/pro-experience.model';
import { ProExperienceService } from 'src/app/consultor/services/pro-experience.service';

@Component({
  selector: 'app-add-pro-experience',
  templateUrl: './add-pro-experience.component.html',
  styleUrls: ['./add-pro-experience.component.scss']
})
export class AddProExperienceComponent {

  @Output() ProExpAdded = new EventEmitter<ProfessionalExperienceDTO>();

  displayModal!: boolean;
  displayPosition!: boolean;
  position!: string;
  stateOptions!: any[];
  value1: string = "off";
  value2!: number;
  proexperienceForm: FormGroup;
  showPeriodEnd: boolean = false;

  constructor(private proExpService :ProExperienceService,
    private messageService: MessageService, private authService: AuthService) {
    this.proexperienceForm = new FormGroup({
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
  ngOnInit() { }

  onSubmit() {
    if (this.proexperienceForm.valid) {
       console.log('Event emitted with data:', this.proexperienceForm.value);
       this.ProExpAdded.emit(this.proexperienceForm.value);
       this.proexperienceForm.reset();
       this.displayModal=false
    } else {
       console.log('Form validation error');
       // Handle form validation errors
    }
 }
 

 isFieldInvalid(fieldName: string): boolean {
  const field = this.proexperienceForm.get(fieldName);
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
