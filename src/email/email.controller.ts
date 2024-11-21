import { Controller} from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { EmailService } from './email.service';
import { SendEmailOptions } from './interfaces/send-email.interface';

@Controller()
export class EmailController {
  constructor(private readonly emailService: EmailService) {}

  @MessagePattern('sendEmail')
  create(@Payload() sendEmailOptions: SendEmailOptions) {
    return this.emailService.sendEmail(sendEmailOptions).catch((error) => console.log(error));
  }
}
