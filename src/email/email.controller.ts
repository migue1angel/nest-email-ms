import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { EmailService } from './email.service';
import { SendEmailDto } from './dto/send-email.dto';

@Controller()
export class EmailController {
  constructor(private readonly emailService: EmailService) {}

  @MessagePattern('sendEmail')
  create(@Payload() sendEmailDto: SendEmailDto) {
    return this.emailService.sendEmail(sendEmailDto);
  }
}
