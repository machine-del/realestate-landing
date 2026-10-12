import { Body, Controller, Ip, Post } from '@nestjs/common';
import { ContactService } from './contact.service.js';

@Controller('contact')
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  @Post()
  submit(@Body() body: unknown, @Ip() ipAddress: string) {
    return this.contactService.submit(body, ipAddress);
  }
}
