/* eslint-disable prettier/prettier */
export interface CreateCategorieDto {
    _id: string;
    title: string;
    code: string;
    absolutePath: string;
    Parent: CreateCategorieDto;
    // Childs: CreateCategorieDto[];
}