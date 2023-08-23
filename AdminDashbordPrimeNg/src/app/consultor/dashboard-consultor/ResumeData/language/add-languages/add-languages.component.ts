import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { AuthService } from 'src/app/auth/services/auth.service';
import { LanguageDTO } from 'src/app/consultor/models/langues.model';
import { LanguagesService } from 'src/app/consultor/services/languages.service';

@Component({
  selector: 'app-add-languages',
  templateUrl: './add-languages.component.html',
  styleUrls: ['./add-languages.component.scss']
})
export class AddLanguagesComponent {
  @Output() LangueAdded = new EventEmitter<LanguageDTO>();

  displayModal!: boolean;
  displayPosition!: boolean;
  position!: string;
  stateOptions!: any[];
  value1: string = "off";
  value2!: number;
  LangueForm!: FormGroup;

  
  constructor(private langueService : LanguagesService,
    private messageService: MessageService, private authService: AuthService) {
      this.LangueForm = new FormGroup({
        //_id: new FormControl(''),
        language: new FormControl('', Validators.required),
        level: new FormControl('', Validators.required),
        certificate: new FormControl('', Validators.required),
        score: new FormControl('')
      });
  }


  onSubmit() {
    if (this.LangueForm.valid) {
       console.log('Event emitted with data:', this.LangueForm.value);
       this.LangueAdded.emit(this.LangueForm.value);
       this.LangueForm.reset();
       this.displayModal=false
    } else {
       console.log('Form validation error');
       // Handle form validation errors
    }
 }
 

 isFieldInvalid(fieldName: string): boolean {
  const field = this.LangueForm.get(fieldName);
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
  
    this.LangueForm.reset();
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
