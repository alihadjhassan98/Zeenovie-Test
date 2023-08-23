// import { ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
// import { AuthGuard } from './auth.guard';


// @Injectable()
// export class PassportAuthGuard {
//   private authGuard: NestAuthGuard;

//   constructor() {
//     this.authGuard = new NestAuthGuard('google');
//   }

//   async canActivate(context: ExecutionContext): Promise<boolean> {
//     const result = (await this.authGuard.canActivate(context)) as boolean;

//     if (!result) {
//       throw new UnauthorizedException('Google authentication failed');
//     }

//     // Custom logic: Check if the user's email domain is allowed
//     const request = context.switchToHttp().getRequest();
//     const user = request.user;
//     const allowedEmailDomain = 'example.com';
//     const emailDomain = user.email.split('@')[1];

//     if (emailDomain !== allowedEmailDomain) {
//       throw new UnauthorizedException('Email domain not allowed');
//     }

//     return result;
//   }
// }
