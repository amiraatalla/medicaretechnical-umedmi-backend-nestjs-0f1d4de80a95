import { Injectable } from '@nestjs/common';
import { SmsProviderInterface } from './sms-provider.interface';
import { SendSmsDto } from './send-sms.dto';

@Injectable()
export class SmsMockCommunicatorService implements SmsProviderInterface {
  send(message: SendSmsDto): Promise<boolean> {
    return Promise.resolve(message.message === message.message);
  }
}
