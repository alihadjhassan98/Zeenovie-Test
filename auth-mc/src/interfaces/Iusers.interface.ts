export interface IUsers {
    _id?: string;
    email: string;
    username: string;
    is_confirmed: boolean;
    role: String;
    createdAt: Date;
  }