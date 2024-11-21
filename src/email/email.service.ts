import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { SendEmailOptions } from './interfaces/send-email.interface';
import { envs } from 'src/config/envs';

@Injectable()
export class EmailService {
  private readonly transporter = nodemailer.createTransport({
    service: envs.MAILER_SERVICE,
    auth: {
      user: envs.MAILER_EMAIL,
      pass: envs.MAILER_KEY,
    },
  });

  async sendEmail(options: SendEmailOptions): Promise<boolean> {
    const { content, title, subject, to, attachments = [] } = options;

    const htmlBody = `
    <h3> ${title}</h3>
    <p> ${content}</p>
    `;
    try {
      await this.transporter.sendMail({
        from: {
          name: envs.MAILER_NAME,
          address: envs.MAILER_EMAIL,
        },
        bcc: to,
        subject,
        html: htmlBody,
        attachments: attachments,
      });
      return true;
    } catch (error) {
      console.log(error);

      return false;
    }
  }
}
