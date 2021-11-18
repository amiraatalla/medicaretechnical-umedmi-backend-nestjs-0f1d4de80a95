import { EmailProviderInterface } from './email-provider.interface';
import { Injectable, Logger, ServiceUnavailableException } from '@nestjs/common';
import { SendEmailDto } from './send-email.dto';
import { ConfigService } from '@nestjs/config';
import * as sgMail from '@sendgrid/mail';
import { logger } from '@typegoose/typegoose/lib/logSettings';

@Injectable()
export class MandrillService implements EmailProviderInterface {
  private client;

  constructor(private config: ConfigService) {
    this.client = sgMail.setApiKey(config.get('SEND_GRID_API_KEY'));
  }

  async send(options: SendEmailDto) {
    try {
      const msg = {
        to: options.to,
        from: this.config.get('FROM_EMAIL'),
        subject: options.subject,
        text: options.text,
      };
      await sgMail.send(msg);
      return true;
    } catch (e) {
      Logger.log(e, 'Mailer error');
      // throw new ServiceUnavailableException(e, 'Error at mailer service');
    }
  }
}
