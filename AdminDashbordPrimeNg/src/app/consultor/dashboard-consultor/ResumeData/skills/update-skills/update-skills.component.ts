import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { AuthService } from 'src/app/auth/services/auth.service';
import { SkillsDTO } from 'src/app/consultor/models/skills.model';
import { SkillsService } from 'src/app/consultor/services/skills.service';

@Component({
  selector: 'app-update-skills',
  templateUrl: './update-skills.component.html',
  styleUrls: ['./update-skills.component.scss']
})
export class UpdateSkillsComponent {
  displayModal!: boolean;
  displayPosition!: boolean;
  position!: string;
  stateOptions!: any[];
  value1: string = "off";
  value2!: number;
  skillsForm!: FormGroup;
  @Input() skill!: SkillsDTO;
  @Output() skillUpdated = new EventEmitter<void>();

  constructor(private skillService :SkillsService,
    private messageService: MessageService, private authService: AuthService) {

      this.skillsForm = new FormGroup({
         _id: new FormControl(''),
        competence: new FormControl('', Validators.required),
        level: new FormControl('', Validators.required),
        description: new FormControl('')
      });
}

ngOnInit() {
  this.skillsForm.patchValue(this.skill);
}

onSubmit() {
  const id = this.skillsForm.get('_id')?.value;
  if (!id) {
    console.error('No logged-in user found');
    return;
  }
  this.skillService.updateSkill(this.skillsForm.value, id).subscribe(
    (skill) => {
      console.log(skill);
      this.messageService.add({severity:'success', summary: 'Successful', detail:'Skill updated Successfully', life: 3000});
      this.skillUpdated.emit();
      this.displayModal=false
    },
    (error) => {
      console.error(error);
    }
  );
}

isFieldInvalid(fieldName: string): boolean {
  const field = this.skillsForm.get(fieldName);
  const ok = !!(field && field.invalid && (field.dirty || field.touched));
  // console.log("the "+ fieldName +" variable contenus " + ok);
  return ok
}
loadskills(skill: SkillsDTO) {
  this.skill = skill;
  this.skillsForm.patchValue(this.skill);
}
showModalDialog() {
  this.skillsForm.patchValue(this.skill); // Populate the form
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
