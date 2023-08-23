import { Body, Controller, Get, HttpException, HttpStatus, Headers, Inject, Post, Param, Req, UseGuards, Put } from '@nestjs/common';
import { ClientProxy, Payload } from '@nestjs/microservices';
import { firstValueFrom, lastValueFrom } from 'rxjs';
import { LoginDTO } from './dto/login.dto';
import { RegisterDTO } from './dto/register.dto';
import { ResetpwdDTO } from './dto/resetpwd.dto';
import { IResponseUser } from './interfaces/responseuser.interface';
import { IUsers } from './interfaces/IUsers.interface';
import { CheckEmailExistsDto } from './dto/CheckEmailExistsDto .dto';
import { IProfessionalData, IUserswithProDataAndImage, ImageDTO, Ratingss } from './interfaces/IUserswithProDataAndImage';

@Controller('auth')
export class AuthController {
  constructor(@Inject('AUTH_SERVICE') private readonly authServiceClient: ClientProxy,
  @Inject("UPLOAD-MC") private readonly ImageService: ClientProxy,@Inject("CV-SERVICE") 
  private readonly professionalDataService: ClientProxy,@Inject('ENTREPRISE-MC') private readonly commentService : ClientProxy,) { }


  @Get('verifytoken')
  async Verify(@Payload() token: string) {
    const res = await this.authServiceClient.send('verifytoken', token);
    return res;
  }

  //this with the user name with no verification for the admin 
  @Post('reset-password-admin')
  async resetPasswordAdmin(@Body() resetDTO: ResetpwdDTO) {
    try {
      const { username, newpassword } = resetDTO;
      const resetPwdObservable = this.authServiceClient.send('reset-password-admin', { username, newpassword });
      const resetPwdResponse = await lastValueFrom(resetPwdObservable);
      return resetPwdResponse;
    } catch (error) {
      throw new HttpException('An error occurred while resetting the password.', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  //this for the users with the verifications in email 
  @Post('reset-password')
  async resetPassword(@Body() resetDTO: ResetpwdDTO) {
    try {
      const { username, newpassword, token } = resetDTO;
      const resetPwdObservable = this.authServiceClient.send('reset-password', { username, newpassword, token });
      const resetPwdResponse = await lastValueFrom(resetPwdObservable);
      return resetPwdResponse;
    } catch (error) {
      throw new HttpException('An error occurred while resetting the password.', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }


  @Get('getUserById/:id')
  async getUserById(@Param('id') id: string) {
    const res = await this.authServiceClient.send('getUserById', id);
    return res;
  }


  @Post('login')
  async login(@Body() loginDTO: LoginDTO) {
    //const user = await this.userService.login(loginDTO);
    let resLogin: IResponseUser = await firstValueFrom(this.authServiceClient.send<IResponseUser>('login', loginDTO));
    if (resLogin.res == null) {
      throw new HttpException(
        {
          message: resLogin.message,
          data: null,
          errors: resLogin.errors,
        },
        resLogin.status,
      );
    }
    return resLogin
  }


  @Post('register')
  async register(@Body() registerDTO: RegisterDTO) {
    try {
      const resRegister: IResponseUser = await firstValueFrom(this.authServiceClient.send<IResponseUser>('register', registerDTO));
      if (resRegister.res == null) {

        throw new HttpException(
          {
            message: resRegister.message,
            data: null,
            errors: resRegister.errors,
          },
          resRegister.status,
        );
      }
      return resRegister;
    } catch (err) {

      if (err instanceof HttpException) {

        throw err;
      }
      throw new HttpException(
        {
          message: 'Error occurred while registering user.',
          data: null,
          errors: err.toString(),
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post('request-password-reset')
  async requestPasswordReset(@Body() resetRequest: { email?: string; username?: string }): Promise<any> {
    return await this.authServiceClient.send('request-password-reset', resetRequest).toPromise();
  }

  @Post('check-email-exists')
  async checkEmailExists(@Body() checkEmailExistsDto: CheckEmailExistsDto): Promise<boolean> {
    try {
      const emailExists = await firstValueFrom(this.authServiceClient.send<boolean>('check_email_exists', checkEmailExistsDto));
      return emailExists;
    } catch (err) {
      throw new HttpException(
        {
          message: 'Error occurred while checking email existence.',
          data: null,
          errors: err.toString(),
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  @Put('UpdateUser')
  async UpdateUser(@Body() user: IUsers) {
    console.log('Update User', user);
    try {
      const res = await this.authServiceClient.send({ cmd: 'UpdateUser' }, { user });
      return res;
    } catch {
      throw new HttpException('Microservice is not available', HttpStatus.NOT_FOUND);
    }
  }

  @Get('getAllAdmins')
  async getAllUsers() {
    try {
      const res = this.authServiceClient.send<{}>("GetAllUsers", {});
      return res;
    } catch {
      throw new HttpException('Microservice is not available', HttpStatus.NOT_FOUND);
    }

  }
  @Get('GetAllUsers')
  async getAllUser() {
    try {
      const res = this.authServiceClient.send<{}>("findAllUsers", {});
      return res;
    }
    catch {
      throw new HttpException('Microservice is not available', HttpStatus.NOT_FOUND);
    }

  }
  @Get('getAllConsultants')
  async getAllConsultants() {
    try {
      const res = this.authServiceClient.send<{}>("getAllConsultants", {});
      return res;
    }
    catch {
      throw new HttpException('Microservice is not available', HttpStatus.NOT_FOUND);
    }
  }

  @Get('consultants/withProDataAndImage')
  async findAllConsultantsWithProDataAndImage(): Promise<IUserswithProDataAndImage[]> {
    const users$ = this.authServiceClient.send<IUserswithProDataAndImage[], {}>('getAllConsultants', {});
    const users = await firstValueFrom(users$);

    const consultantsWithProDataAndImage = await Promise.all(
      users.map(async consultant => {
        const proData$ = this.professionalDataService.send<IProfessionalData[], { IdUser: string }>('getAllProfessionalDataByUser', { IdUser: consultant._id });
        const proData = await firstValueFrom(proData$);

        const image$ = this.ImageService.send<ImageDTO[], { IdUser: string }>('getAllImagesByUser', { IdUser: consultant._id });
        const images = await firstValueFrom(image$);
        
        const rating$ = this.commentService.send<Ratingss[], { consultantId: string }>('getAllRatingsByUser', { consultantId: consultant._id });
        const rating = await firstValueFrom(rating$);

        return {
          ...consultant,
          prodata: proData,
          images: images,
          ratings:rating
        };
      }),
    );

    return consultantsWithProDataAndImage;
  }



  @Get('getAllentreprises')
  async GetAllentreprises() {
    try {
      const res = this.authServiceClient.send<{}>("getAllentreprises", {});
      return res;
    }
    catch {
      throw new HttpException('Microservice is not available', HttpStatus.NOT_FOUND);
    }
  }

}






