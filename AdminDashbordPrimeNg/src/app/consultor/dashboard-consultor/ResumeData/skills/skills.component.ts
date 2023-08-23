import { SkillsDTO } from './../../../models/skills.model';
import { Component, ViewChild } from '@angular/core';
import { ConfirmationService, Message, MessageService, PrimeNGConfig } from 'primeng/api';
import { AuthService } from 'src/app/auth/services/auth.service';
import { SkillsService } from 'src/app/consultor/services/skills.service';
import { AddSkillsComponent } from './add-skills/add-skills.component';
import { UpdateSkillsComponent } from './update-skills/update-skills.component';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.scss']
})
export class SkillsComponent {
  isEditing: boolean = false;
  displayModal!: boolean;
  displayPosition!: boolean;
  position!: string;
  stateOptions!: any[];
  messages!: Message[];
  skills: SkillsDTO[] = [];
  @ViewChild(AddSkillsComponent)private addSkillsComponent!: AddSkillsComponent;
  @ViewChild(UpdateSkillsComponent )private UpdateSkillsComponent!: UpdateSkillsComponent;
   selectedSkill!: SkillsDTO;

  constructor(private primengConfig: PrimeNGConfig,private skillsService: SkillsService,
    private authService :AuthService,private messageService: MessageService,
    private confirmationService: ConfirmationService) { }

  ngOnInit() {

    this.messages = [
      { severity: 'info', summary: 'Info', detail: 'You havent figured out your Skills ' },

    ];
    this.primengConfig.ripple = true;
    this.loadSkills()
  }
  openModalForCreate() {
    this.isEditing = false;
    this.addSkillsComponent.showModalDialog();
  }
  openModalForUpdate(skills: SkillsDTO) {
    this.isEditing = true;
    this.UpdateSkillsComponent.loadskills(skills);
    this.UpdateSkillsComponent.showModalDialog();
  }
  

  
  confirmDelete(item: SkillsDTO) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete this Skill ?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.deleteSkills(item);
        this.loadSkills()
      }
    });
  }

  deleteSkills(item: SkillsDTO) {
    this.skillsService.deleteSkill(item._id).subscribe(
      () => {
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'skill deleted Successfully', life: 3000 });
        this.loadSkills(); 
      },
      (error) => {
        console.error(error);
      }
    );
  }
  
 
  



  loadSkills() {
    const userId = this.authService.getLoggedInUserId();
    if (!userId) {
      console.error('No logged-in user found');
      return;
    }
    this.skillsService.getAllSkillsDTOByUserId(userId).subscribe((data) => {
      this.skills=data; 
      //console.log(this.skills)
      },
    );
  }

  createskill(skill :SkillsDTO) {
    const token = this.authService.getToken();
    this.skillsService.createSkill(skill,token).subscribe((createdskilll) => {
        //console.log(createdLangue);
        this.messageService.add({severity:'success', summary: 'Successful', detail:'Skill  created Successfully', life: 3000});
        this.loadSkills();
      //hedhy besh ki tokhroj w ma taamelsh ajout wela update yreseti linputs
      //zedtha fl classet lkol 
   
      },
    );
    }


  }
