import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { envs } from 'src/config/envs';
import { SendEmailDto } from './dto/send-email.dto';

@Injectable()
export class EmailService {
  private readonly transporter = nodemailer.createTransport({
    service: envs.MAILER_SERVICE,
    auth: {
      user: envs.MAILER_EMAIL,
      pass: envs.MAILER_KEY,
    },
  });

  async sendEmail(sendEmailDto: SendEmailDto): Promise<boolean> {
    const { content, title, subject, to = [] } = sendEmailDto;

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
        // attachments: attachments,
      });
      return true;
    } catch (error) {
      console.error(error);
    }
  }
}
