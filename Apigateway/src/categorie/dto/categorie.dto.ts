/* eslint-disable prettier/prettier */
export interface CategorieDto{
    _id:string;
    title: string;
    code: string;
    //absolutePath: string;
    Parent: CategorieDto;
   // Childs: CreateCategorieDto[];
}