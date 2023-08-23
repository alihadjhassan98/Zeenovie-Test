
export interface ImageDTO {
    _id: string;
    IdUser: string;
    data: string;
    __v: number;
  }
  
  export interface EntrepriseData {
     IdUser: string;
     nameE: string;
     activitySectorE: string;
     categoryE: string;
     titleEntreprise: string;
     sizeE: string;
     descriptionE: string;
     countryE: string;
     regionE: string;
     villeE: string;
     ZIPcodeE: string;
     adresse: string;
     streetNumber: string;
     telE: string[];
     telOwner: string[];
     linkWebSite: string;
  }
  

  


export interface CommentResponse{
  _id:string;
  IdUser: string;
  entrepriseId: string;
  likes: number;
  content: string;
  likedBy: string[]; 
  commentedAt: Date;
  status: string;
  entrepriseimages: ImageDTO[];
  entreprisedata: EntrepriseData[];
}
