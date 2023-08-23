


export interface UpdateCommentDto {
    IdUser: string;
    entrepriseId: string;
    consultantId: string;
    likedBy: string[]; 
    likes: number;
    content: string;
    commentedAt: Date;
    status: string;

}
