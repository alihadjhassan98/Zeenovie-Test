export interface ImageDTO {
    _id: string;
    IdUser: string;
    data: string;
    __v: number;
  }
  
  export interface IProfessionalData {
    _id: string;
    IdUser: string;
    Title: string;
    LevelOfEducation: string;
    LevelOfExperience: string;
    CurrentNetSalary: number;
    ProfessionalSituation: string;
    Availability: string;
    DesiredMinimumNetSalary: number;
    Jobs: string[];
    JobCategorie: string[];
    SectorsOfActivity: string[];
    TypesOfPositions: string[];
    DesiredWorkLocations: string[];
    Occupation: string[];
    Mobility: string[];
    createdAt: string;
    updatedAt: string;
    __v: number;
    Address: string;
    City: string;
    Region: string;
  }
  
  export interface Ratingss {
    _id: string;
    consultantId: string;
    userId: string;
    ratingValue: number;
    createdAt: Date;
    updatedAt: Date;
  }
  export interface IUserswithProDataAndImage {
    _id?: string;
    email: string;
    username: string;
    is_confirmed: boolean;
    role: string;
    prodata: IProfessionalData[];
    images: ImageDTO[];
    ratings:Ratingss[];
  }