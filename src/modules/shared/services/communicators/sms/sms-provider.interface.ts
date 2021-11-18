import { SendSmsDto } from './send-sms.dto';

export interface SmsProviderInterface {
  send(message: SendSmsDto): Promise<boolean>;
}
