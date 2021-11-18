import { SmsProviderInterface } from './sms-provider.interface';
import { HttpService, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SmsMisrResponse } from './sms-misr.response';
import { SmsMisrResponseCodesEnum } from './sms-misr-response-codes.enum';
import { SendSmsDto } from './send-sms.dto';

@Injectable()
export class SmsMisrCommunicatorService implements SmsProviderInterface {
  constructor(private httpService: HttpService, private config: ConfigService) {}

  async send(sms: SendSmsDto): Promise<boolean> {
    const url = this.buildUrl(sms);
    const result = await this.httpService.post<SmsMisrResponse>(url, {}).toPromise();
    return result.data.code === SmsMisrResponseCodesEnum.SUCCESS;
  }

  private buildUrl(sms: SendSmsDto): string {
    const url = new URL(this.config.get('SMS_MISR_API_URL'));
    url.searchParams.append('mobile', sms.phone);
    url.searchParams.append('username', this.config.get('SMS_MISR_USERNAME'));
    url.searchParams.append('password', this.config.get('SMS_MISR_PASSWORD'));
    url.searchParams.append('sender', this.config.get('SMS_MISR_SENDER_ID'));
    url.searchParams.append('language', sms.language === 'en' ? '1' : '2');
    url.searchParams.append('message', sms.message);

    return url.toString();
  }
}
