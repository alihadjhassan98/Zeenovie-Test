import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { AuthService } from 'src/app/auth/services/auth.service';
import { SkillsDTO } from 'src/app/consultor/models/skills.model';
import { SkillsService } from 'src/app/consultor/services/skills.service';
import { HttpClient } from '@angular/common/http';



interface Skill {
  _id: string;
  title: string;
  code: string;
  // Add other properties as needed
}

@Component({
  selector: 'app-add-skills',
  templateUrl: './add-skills.component.html',
  styleUrls: ['./add-skills.component.scss']
})
export class AddSkillsComponent {
  @Output() SkillAdded = new EventEmitter<SkillsDTO>();

  displayModal!: boolean;
  displayPosition!: boolean;
  position!: string;
  stateOptions!: any[];
  value1: string = "off";
  value2!: number;
  skillsForm!: FormGroup;
  skillsList: Skill[] = []; // Use the Skill interface here


  constructor(private skillService: SkillsService,
    private messageService: MessageService, private authService: AuthService,  private http: HttpClient    ) {
      this.skillsForm = new FormGroup({
        // _id: new FormControl(''),
        competence: new FormControl('', Validators.required),
        level: new FormControl('', Validators.required),
        description: new FormControl('')
      });
  }
  ngOnInit() {
    this.fetchSkillsList(); // Fetch the skills list on component initialization

   }

  onSubmit() {
    if (this.skillsForm.valid) {
       console.log('Event emitted with data:', this.skillsForm.value);
       this.SkillAdded.emit(this.skillsForm.value);
       this.skillsForm.reset();
       this.displayModal=false
    } else {
       console.log('Form validation error');
       // Handle form validation errors
    }
 }


 fetchSkillsList() {
  this.http.get<Skill[]>('http://localhost:3000/categorie/all').subscribe(
    (data: Skill[]) => {
      this.skillsList = data;
    },
    (error) => {
      console.error('Error fetching skills list:', error);
    }
  );
}
 

 isFieldInvalid(fieldName: string): boolean {
  const field = this.skillsForm.get(fieldName);
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
  
    this.skillsForm.reset();
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
