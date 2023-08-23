import { IUser } from './../../interfaces/user.interface';
import { Body, Controller, Get, HttpException, HttpStatus, Post, Res, UseGuards } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { AuthGuard } from '@nestjs/passport';
import { LoginDTO } from '../dto/login.dto';
import { RegisterDTO } from '../dto/register.dto';
import { ResetpwdDTO } from '../dto/resetpwd.dto';
import { AuthService } from '../services/auth/auth.service';
import { UserService } from '../services/user/user.service';
import { OAuth2Profile } from '../dto/OAuth2Profile.dto';

@Controller()
export class UserController {
  constructor(
    private userService: UserService,
    private authService: AuthService
  ) { }

  @MessagePattern('register')
  // @Post('register')
  async register(@Payload() registerDTO: RegisterDTO) {
    const user = await this.userService.create(registerDTO);
    return user;
  }
  @MessagePattern('login')
  async login(@Payload() loginDTO: LoginDTO) {
    const user = await this.userService.login(loginDTO);

    return user;
  }


  //@Post('resetpwd')
  @MessagePattern('verifytoken')
  async Verify(@Payload() token: string) {
    const res = await this.authService.decodeToken(token);
    return res;
  }


  @MessagePattern('GetAllUsers')
  async GetAllAdmins() {
    return this.userService.findAllAdmins()
  }
  @MessagePattern('findAllUsers')
  async GetAllUser() {
    return this.userService.findAllUsers()
  }
  @MessagePattern('getAllConsultants')
  async GetAllConsultants() {
    return this.userService.findAllConsultants()
  }
  @MessagePattern('getAllentreprises')
  async GetAllentreprises() {
    return this.userService.findAllentreprises()
  }

  @MessagePattern('reset-password-admin')
  async resetPasswordadmin(@Payload() resetDTO: ResetpwdDTO) {
    const { username, newpassword } = resetDTO;

    let user = await this.userService.findOneByUsernameOrEmail(username);
    if (!user) {
      throw new HttpException('No user found with the provided username or email.', HttpStatus.BAD_REQUEST);
    }

    user.password = newpassword;
    await user.save();

    return { message: 'Password reset successful.' };
  }

  @MessagePattern('reset-password')
  async resetPassword(@Payload() resetDTO: ResetpwdDTO) {
    const { username, newpassword, token } = resetDTO;

    let user = await this.userService.findOneByUsernameOrEmail(username);
    if (!user) {
      throw new HttpException('No user found with the provided username or email.', HttpStatus.BAD_REQUEST);
    }

    if (user.resetPasswordToken !== token || !user.resetPasswordExpires || new Date() > user.resetPasswordExpires) {
      throw new HttpException('Invalid or expired password reset token.', HttpStatus.BAD_REQUEST);
    }

    user.password = newpassword;
    user.resetPasswordToken = null;
    user.resetPasswordExpires = null;
    await user.save();

    return { message: 'Password reset successful.' };
  }


  @MessagePattern("getUserById")
  async getUserById(@Payload() id: string): Promise<IUser> {
    return this.userService.findUserbyid(id);
  }

  /*
  @Get("onlyauth")
  @UseGuards(AuthGuard("jwt"))
  
   async hiddenInformation(){
     return  "hidden information";
   }
   */





  @MessagePattern('request-password-reset')
  async requestPasswordReset(@Payload() resetRequest: { email?: string; username?: string }) {
    return await this.userService.requestPasswordReset(resetRequest);
  }

  @MessagePattern('findOrCreateUserByGoogleProfile')
  async findOrCreateUserByGoogleProfile(profile: OAuth2Profile) {
    return await this.userService.findOrCreateUserByGoogleProfile(profile);
  }

  @MessagePattern({ cmd: 'UpdateUser' })
  update(data: { user: IUser }) {
    console.log(JSON.stringify(data.user));
    return this.userService.UpdateUser(data.user);
  }
}
