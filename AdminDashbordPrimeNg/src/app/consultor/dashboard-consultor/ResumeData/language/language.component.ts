import { Component, OnInit, ViewChild } from '@angular/core';
import { ConfirmationService, Message, MessageService, PrimeNGConfig } from 'primeng/api';
import { AuthService } from 'src/app/auth/services/auth.service';
import { LanguageDTO } from 'src/app/consultor/models/langues.model';
import { LanguagesService } from 'src/app/consultor/services/languages.service';
import { AddLanguagesComponent } from './add-languages/add-languages.component';
import { UpdateLanguagesComponent } from './update-languages/update-languages.component';

@Component({
  selector: 'app-language',
  templateUrl: './language.component.html',
  styleUrls: ['./language.component.scss']
})
export class LanguageComponent implements OnInit {
  isEditing: boolean = false;
  displayModal!: boolean;
  displayPosition!: boolean;
  position!: string;
  stateOptions!: any[];
  messages!: Message[];
  languages: LanguageDTO[] = [];
  @ViewChild(AddLanguagesComponent)private addLanguagesComponent!: AddLanguagesComponent;
  @ViewChild(UpdateLanguagesComponent )private updateLanguagesComponent!: UpdateLanguagesComponent;


  constructor(private primengConfig: PrimeNGConfig,private LanguageService: LanguagesService,
    private authService :AuthService,private messageService: MessageService,
    private confirmationService: ConfirmationService) { }

  ngOnInit() {

    this.messages = [
      { severity: 'info', summary: 'Info', detail: 'You havent figured out your Languages ' },

    ];
    this.primengConfig.ripple = true;
    this.loadLaguages()
  }


  openModalForCreate() {
    this.isEditing = false;
    this.addLanguagesComponent.showModalDialog();
  }
  openModalForUpdate(langue: LanguageDTO) {
    this.isEditing = true;
    this.updateLanguagesComponent.loadLanguages(langue);
    this.updateLanguagesComponent.showModalDialog();
  }
  confirmDelete(item: LanguageDTO) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete this Languages ?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.deletelangue(item);
        this.loadLaguages()
      }
    });
  }

  deletelangue(item: LanguageDTO) {
    this.LanguageService.deleteLanguage(item._id).subscribe(
      () => {
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'langue deleted Successfully', life: 3000 });
        this.loadLaguages(); 
      },
      (error) => {
        console.error(error);
      }
    );
  }
  
 



  loadLaguages() {
    const userId = this.authService.getLoggedInUserId();
    if (!userId) {
      console.error('No logged-in user found');
      return;
    }
    this.LanguageService.getAllLanguageDTOByUserId(userId).subscribe((data) => {
      this.languages=data; 
      console.log(this.languages)
      },
    );
  }

  createLangue(langue :LanguageDTO) {
    const token = this.authService.getToken();
    this.LanguageService.createLanguageDTO(langue,token).subscribe((createdLangue) => {
        //console.log(createdLangue);
        this.messageService.add({severity:'success', summary: 'Successful', detail:'Langue created Successfully', life: 3000});
        this.loadLaguages(); // Reload trainings qualifications after creating new one
      },
    );
    }  
}
