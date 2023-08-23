import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Roles } from 'src/classes/roles.class';
import { IResponse } from 'src/interfaces/response.interface';
import { IUser } from 'src/interfaces/user.interface';
import { LoginDTO } from 'src/user/dto/login.dto';
import { RegisterDTO } from 'src/user/dto/register.dto';
import { ResetpwdDTO } from 'src/user/dto/resetpwd.dto';
import { IPayload } from 'src/user/interfaces/payload.interface';
import { AuthService } from '../auth/auth.service';
import { v4 as uuidv4 } from 'uuid';
import { EmailService } from './email.service';
import { OAuth2Profile } from 'src/user/dto/OAuth2Profile.dto';
import { IUsers } from 'src/interfaces/Iusers.interface';

@Injectable()
export class UserService {


  constructor(
    @InjectModel('User') private userModel: Model<IUser>,
    private authService: AuthService,
    private emailService: EmailService,
  ) { }
  async create(registerDTO: RegisterDTO): Promise<IResponse> {
    const { email } = registerDTO;
    const { username } = registerDTO;

    let user = await this.userModel.findOne({ email });
    if (user) {
      const result = {
        status: HttpStatus.BAD_REQUEST,
        message: 'Email already exists',
        res: null,
        errors: null,
      };
      return result;
    }
    user = await this.userModel.findOne({ username });
    if (user) {
      const result = {
        status: HttpStatus.BAD_REQUEST,
        message: 'Username already exists',
        res: null,
        errors: null,
      };
      return result;
    }
    console.log(registerDTO.email);
    registerDTO.email = registerDTO.email.toLowerCase();
    registerDTO.username = registerDTO.username.toLowerCase();
    if (!Roles.getRoles().includes(registerDTO.role)) {
      const result = {
        status: HttpStatus.BAD_REQUEST,
        message: 'Role Does not exist!',
        res: null,
        errors: null,
      };
      return result;
    }
    const createdUser = new this.userModel(registerDTO);

    try {
      await createdUser.save();
      const payload = {
        id: createdUser._id,
        email: createdUser.email,
        username: createdUser.username,
        is_confirmed: false,
        role: createdUser.role
      }
      const token = await this.authService.signPayload(payload);
      const result = {
        status: HttpStatus.CREATED,
        message: 'Success',
        res: {
          token: token,
          user: createdUser,
        },
        errors: null,
      };
      return result;
    }
    catch (err) {
      const result = {
        status: HttpStatus.BAD_REQUEST,
        message: err.message,
        res: null,
        errors: err,
      };
      return result;
    }

  }

  async login(loginDTO: LoginDTO) {
    const { password } = loginDTO;
    const { username } = loginDTO;
    let user = await this.userModel.findOne({ $or: [{ username: username.toLowerCase() }, { email: username.toLowerCase() }] })
    if (!user) {
      const result = {
        status: HttpStatus.NOT_FOUND,
        message: "Email/Username is incorrect",
        res: null,
        errors: null,
      };
      return result;
    }
    else {
      let result = await user.compareEncryptedPassword(password);
      if (!result) {
        const result = {
          status: HttpStatus.UNAUTHORIZED,
          message: "Password is incorrect",
          res: null,
          errors: null,
        };
        return result;
      }
      const payload = {
        id: user._id,
        email: user.email,
        username: user.username,
        is_confirmed: user.is_confirmed,
        role: user.role
      }
      const token = await this.authService.signPayload(payload);
      const response = {
        status: null,
        message: 'Success',
        res: {
          token: token,
          user: user,
        },
        errors: null,
      };
      return response;
    }
  }
  async resetPassword(resetDTO: ResetpwdDTO) {
    const { username } = resetDTO;

    let user = await this.userModel.findOne({ $or: [{ username: username.toLowerCase() }, { email: username.toLowerCase() }] })
    if (!user) {
      throw new HttpException('no user Found', HttpStatus.BAD_REQUEST);
    }

  }




  async findByPayload(payload: IPayload) {
    let { username } = payload;
    username = username.toLowerCase()
    return await this.userModel.findOne({ username });
  }



  async findUserbyid(id: string): Promise<IUser> {
    const user = await this.userModel.findById(id);
    if (!user) {
      throw new NotFoundException("this user not available !")
    }
    return user;
  }

  async findOneByUsernameOrEmail(usernameOrEmail: string): Promise<IUser | null> {
    return await this.userModel.findOne({
      $or: [{ username: usernameOrEmail.toLowerCase() }, { email: usernameOrEmail.toLowerCase() }]
    });
  }
  async requestPasswordReset(resetRequest: { email?: string; username?: string }) {
    const { email, username } = resetRequest;
    let query = {};
    if (email) {
      query['email'] = email.toLowerCase();
    } else if (username) {
      query['username'] = username.toLowerCase();
    } else {
      throw new HttpException('Either email or username must be provided.', HttpStatus.BAD_REQUEST);
    }
    const user = await this.userModel.findOne(query);
    if (!user) {
      throw new HttpException('No user found with the provided email or username.', HttpStatus.BAD_REQUEST);
    }
    const resetToken = uuidv4();
    const expiration = new Date();
    expiration.setHours(expiration.getHours() + 1);

    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = expiration;
    await user.save();
    // Send email containing the reset token
    await this.emailService.sendPasswordResetEmail(user.email, resetToken);
  }
  async generateRandomPassword(length: number): Promise<string> {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let result = '';

    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
  }

  async findOrCreateUserByGoogleProfile(profile: OAuth2Profile): Promise<IUser> {
    const email = profile.email;
    const user = await this.userModel.findOne({ email });

    if (user) {
      return user;
    } else {
      const newUser = new this.userModel({
        username: profile.username,
        email: profile.email,
        role: profile.role,
        is_confirmed: true,
        password: this.generateRandomPassword(10), // Generate a random password with a length of 10 characters
      });

      await newUser.save();
      return newUser;
    }
  }
  async UpdateUser(usr: IUsers) {
    return await this.userModel.findOneAndUpdate({ _id: usr._id }, usr, { new: true });
  }

  async findAllAdmins() {
    return await this.userModel.find({ role: 'admin' });
  }
  async findAllUsers() {
    return await this.userModel.find({ role: { $in: ['consultor', 'entreprise'] } });
  }
  async findAllConsultants() {
    return await this.userModel.find({ role: 'consultor' });
  }
  async findAllentreprises() {
    return await this.userModel.find({ role: 'entreprise' });
  }




}
