export interface OAuth2Profile {
  username: string;
  email: string;
  role: string;
  is_confirmed?: boolean;
  password: string;
  resetPasswordToken?: string;
  resetPasswordExpires?: Date;
}


