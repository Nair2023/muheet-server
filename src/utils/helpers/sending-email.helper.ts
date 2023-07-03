/* eslint-disable prettier/prettier */
import { MailerService } from '@nestjs-modules/mailer';
import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { join } from 'path';
import { emailSanitization } from './email-sanitization.helper';

// TODO: Test this helper
@Injectable()
export class SendEmailHelper {
  constructor(private readonly mailerService: MailerService) {}

  async sendEmail(
    email: string,
    fileName: string,
    subject: string,
    name?: string,
    data?: Record<string, unknown>,
  ): Promise<boolean> {
    try {
      if (email) {
        const sanitizedEmail = emailSanitization(email);

        this.mailerService
          .sendMail({
            to: sanitizedEmail,
            subject: `WashyWash - ${subject} ${!!name ? name : ''}`,
            template: `${join(__dirname, '../../../emails')}/${fileName}`,
            context: {
              data,
            },
          })
          .then((res) => {
            Logger.log('Email has been sent', res);
          })
          .catch((error) => {
            Logger.log(error);
          });
        return true;
      } else {
        return false;
      }
    } catch (error) {
      Logger.error(error);

      throw new BadRequestException(error);
    }
  }
}
