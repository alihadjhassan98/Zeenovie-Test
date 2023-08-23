import { IGeneralUserSchema } from './generaluser.interface';

export interface IUser extends IGeneralUserSchema {
  id?: string;
  resetPasswordToken?: string; 
  resetPasswordExpires?: Date;
}
