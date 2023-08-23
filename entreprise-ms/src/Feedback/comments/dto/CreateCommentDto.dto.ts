


export interface CreateCommentDto {

    IdUser: string;
    entrepriseId: string;
    consultantId: string;
    likedBy: string[]; 
    likes: number;
    content: string;
    commentedAt: Date;
    status: string;
}


