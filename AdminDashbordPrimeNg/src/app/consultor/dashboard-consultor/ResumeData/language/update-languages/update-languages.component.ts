import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { AuthService } from 'src/app/auth/services/auth.service';
import { LanguageDTO } from 'src/app/consultor/models/langues.model';
import { LanguagesService } from 'src/app/consultor/services/languages.service';

@Component({
  selector: 'app-update-languages',
  templateUrl: './update-languages.component.html',
  styleUrls: ['./update-languages.component.scss']
})
export class UpdateLanguagesComponent {
  displayModal!: boolean;
  displayPosition!: boolean;
  position!: string;
  stateOptions!: any[];
  value1: string = "off";
  value2!: number;
  languagesForm!: FormGroup;
  @Input() langue!: LanguageDTO;
  @Output() langueUpdated = new EventEmitter<void>();

  constructor(private langueService :LanguagesService,
    private messageService: MessageService, private authService: AuthService) {

      this.languagesForm = new FormGroup({
        _id: new FormControl(''),
        language: new FormControl('', Validators.required),
        level: new FormControl('', Validators.required),
        certificate: new FormControl('', Validators.required),
        score: new FormControl('')
      });
}

ngOnInit() {
  this.languagesForm.patchValue(this.langue);
}

onSubmit() {
  const id = this.languagesForm.get('_id')?.value;
  if (!id) {
    console.error('No logged-in user found');
    return;
  }
  this.langueService.updateLanguage(this.languagesForm.value, id).subscribe(
    (skill) => {
      console.log(skill);
      this.messageService.add({severity:'success', summary: 'Successful', detail:'Skill updated Successfully', life: 3000});
      this.langueUpdated.emit();
      this.displayModal=false
    
    },
    (error) => {
      console.error(error);
    }
  );
}

isFieldInvalid(fieldName: string): boolean {
  const field = this.languagesForm.get(fieldName);
  const ok = !!(field && field.invalid && (field.dirty || field.touched));
  // console.log("the "+ fieldName +" variable contenus " + ok);
  return ok
}

loadLanguages(langue: LanguageDTO) {
  this.langue = langue;
  this.languagesForm.patchValue(this.langue);
}
showModalDialog() {
  this.languagesForm.patchValue(this.langue); // Populate the form
  this.displayModal = true;
}


showPositionDialog(position: string) {
  this.position = position;
  this.displayPosition = true;
}

closeModal() {

  this.languagesForm.reset();
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
