import { Component, OnInit, ViewChild } from '@angular/core';
import { ConfirmationService, Message, MessageService, PrimeNGConfig } from 'primeng/api';
import { AuthService } from 'src/app/auth/services/auth.service';
import { ProfessionalExperienceDTO } from 'src/app/consultor/models/pro-experience.model';
import { ProExperienceService } from 'src/app/consultor/services/pro-experience.service';
import { AddProExperienceComponent } from './add-pro-experience/add-pro-experience.component';
import { UpdateProExperienceComponent } from './update-pro-experience/update-pro-experience.component';

@Component({
  selector: 'app-pro-experience',
  templateUrl: './pro-experience.component.html',
  styleUrls: ['./pro-experience.component.scss']
})
export class ProExperienceComponent implements OnInit {
  isEditing: boolean = false;
  displayModal!: boolean;
  displayPosition!: boolean;
  position!: string;
  stateOptions!: any[];
  messages!: Message[];
  proexperience: ProfessionalExperienceDTO[] = [];
  @ViewChild(AddProExperienceComponent) private addProfessionalExperience!: AddProExperienceComponent;
  @ViewChild(UpdateProExperienceComponent) private UpdateProfessionalExperience!: UpdateProExperienceComponent;
   selectedExperience!: ProfessionalExperienceDTO;


  constructor(private primengConfig: PrimeNGConfig, private proexpService: ProExperienceService,
    private authService: AuthService, private messageService: MessageService,
    private confirmationService: ConfirmationService) { }

  ngOnInit() {

    this.messages = [
      { severity: 'info', summary: 'Info', detail: 'You havent figured out your Professionel Experience ' },

    ];
    this.primengConfig.ripple = true;
    this.loadProfessionalExperiences()
  }

  openModalForCreate() {
    this.isEditing = false;
    this.addProfessionalExperience.showModalDialog();
  }


  openModalForUpdate(proexperience: ProfessionalExperienceDTO) {
    this.isEditing = true;
    this.UpdateProfessionalExperience.loadTrainingProExperience(proexperience);
    this.UpdateProfessionalExperience.showModalDialog();
  }

  confirmDelete(item: ProfessionalExperienceDTO) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete this Professional Experience ?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.deleteProfessionalExperience(item);
        this.loadProfessionalExperiences()
      }
    });
  }

  deleteProfessionalExperience(item: ProfessionalExperienceDTO) {
    this.proexpService.deleteProfessionalExperienceById(item._id).subscribe(
      () => {
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Professional Experience deleted Successfully', life: 3000 });
        this.loadProfessionalExperiences();
      },
      (error) => {
        console.error(error);
      }
    );
  }

  loadProfessionalExperiences() {
    const userId = this.authService.getLoggedInUserId();
    if (!userId) {
      console.error('No logged-in user found');
      return;
    }
    this.proexpService.getAllProfessionalExperienceByUserId(userId).subscribe((data) => {
      this.proexperience = data;

    },
    );
  }



  createProfessionalExperience(proexperience :ProfessionalExperienceDTO) {
    const token = this.authService.getToken();
    this.proexpService.createProfessionalExperience(proexperience, token).subscribe((createdproexp) => {
      console.log(createdproexp);
      this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Professional Experience created Successfully', life: 3000 });
      this.loadProfessionalExperiences(); // Reload trainings qualifications after creating new one
    },
    );

  }


}