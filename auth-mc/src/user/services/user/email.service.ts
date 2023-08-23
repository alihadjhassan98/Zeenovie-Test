// email.service.ts
import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';

@Injectable()
export class EmailService {
    
  private transporter: Mail;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: Number(process.env.EMAIL_PORT),
      secure: Boolean(process.env.EMAIL_SECURE),
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
  }

  async sendPasswordResetEmail(to: string, resetToken: string): Promise<void> {
    const resetUrl = `${process.env.FRONTEND_URL}/password-reset?token=${resetToken}`;

    const mailOptions = {
      from: process.env.EMAIL_FROM,
      to,
      subject: 'Password Reset Request',
      text: `You have requested a password reset. Please visit the following link to reset your password: ${resetUrl}`,
      html: `
        <p>You have requested a password reset. Please visit the following link to reset your password:</p>
        <a href="${resetUrl}">${resetUrl}</a>
      `,
    };

    await this.transporter.sendMail(mailOptions);
  }


  
}
require('dotenv').config();