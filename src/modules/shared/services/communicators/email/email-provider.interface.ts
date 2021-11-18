import { SendEmailDto } from './send-email.dto';

export const EMAIL_PROVIDER = 'email_provider';

export interface EmailProviderInterface {
  send(options: SendEmailDto): Promise<boolean>;
}
