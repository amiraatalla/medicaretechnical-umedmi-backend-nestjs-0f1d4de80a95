import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Facebook } from 'fb';
import { SocialNetworkServiceInterface } from '../../../interfaces/social-network.service.interface';

@Injectable()
export class FacebookService implements SocialNetworkServiceInterface {
  private client: Facebook;

  constructor(configService: ConfigService) {
    this.client = new Facebook({
      appId: configService.get('FACEBOOK_APP_ID'),
      appSecret: configService.get('FACEBOOK_APP_SECRET'),
    });
  }

  async getProfile(token: string) {
    this.client.options({ accessToken: token });
    const result = await this.client.api('/me');
    return result;
  }
}
