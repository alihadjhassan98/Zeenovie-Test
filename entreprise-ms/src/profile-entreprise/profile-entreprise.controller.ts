import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { Entreprise } from './schemas/entreprise.schema';
import { ProfileEntrepriseService } from './profile-entreprise.service';
import { CreateEntrepriseDto } from './dto/createEntreprise.dto';
import { UpdateEntrepriseDto } from './dto/updateEntreprise.sto';
import { MessagePattern } from '@nestjs/microservices';

@Controller('entreprise')
export class ProfileEntrepriseController {
  constructor(private entrepriseService: ProfileEntrepriseService) { }

  @MessagePattern('getAllEntreprises')
  async findAll(): Promise<Entreprise[]> {
    return this.entrepriseService.findAll();
  }
  @MessagePattern('getAllEntreprisesByUser')
  async findAllProfilesByUser({ IdUser }: { IdUser: string }): Promise<any[]> {
    return this.entrepriseService.findAllProfilesByUser(IdUser);
  }
  @MessagePattern('findAllbyUserid')
  async findAllbyUserid(): Promise<Entreprise[]> {
    return this.entrepriseService.findAll();
  }
  @MessagePattern('createEntreprise')
  async create(entreprise: CreateEntrepriseDto): Promise<Entreprise> {
    return this.entrepriseService.create(entreprise);
  }

  @MessagePattern('getEntrepriseById')
  async findById(UserId: string): Promise<Entreprise> {
    return this.entrepriseService.findbyUserid(UserId);
  }

  @MessagePattern('updateEntreprise')
  async updateById(@Body() data: { id: string; entrepriseDTO: UpdateEntrepriseDto }): Promise<Entreprise> {
    return this.entrepriseService.Updatebyid(data.id, data.entrepriseDTO);
  }

  @MessagePattern('deleteEntreprise')
  async deleteById(id: string): Promise<Entreprise> {
    return this.entrepriseService.Deleteyid(id);
  }

  @MessagePattern('loadEntreprisesByUserIds')
  async loadImages(userIds: string[]) {
    const images = await this.entrepriseService.loadEntreprisesByUserIds(userIds);
    return images.map(image => ({ IdUser: image.IdUser, nameE: image.nameE }));
  }




  // @MessagePattern('updatePersonalData')
  // async updatePersonalData(@Body() data: { id: string, personalDataDTO: UpdatePersonalDataDto }): Promise<PersonalData> {
  //     console.log("datd is equal too   ", data.personalDataDTO)
  //     return this.personalservices.Updatebyid(data.personalDataDTO.IdUser, data.personalDataDTO);
  // }



}
