export interface UpdateCategorieDto {
    _id: string;
    title: string;
    code: string;
    absolutePath: string;
    Parent: UpdateCategorieDto;
    // Childs: CreateCategorieDto[];
}