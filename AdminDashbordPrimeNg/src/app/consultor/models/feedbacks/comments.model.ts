

export interface Comments{
  
    IdUser: string;
    entrepriseId: string;
    likedBy: string[]; 
    likes: number;
    content: string;
    commentedAt: Date;
    status: string;
}
