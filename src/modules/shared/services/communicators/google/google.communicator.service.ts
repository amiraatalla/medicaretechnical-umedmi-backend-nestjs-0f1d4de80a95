import { HttpService, Injectable } from '@nestjs/common';
import { SocialNetworkServiceInterface } from '../../../interfaces/social-network.service.interface';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class GoogleCommunicatorService implements SocialNetworkServiceInterface {
  constructor(private httpService: HttpService, private configService: ConfigService) {}

  async getProfile(token: string): Promise<{ id: string; name: string }> {
    const result = await this.httpService
      .get(this.configService.get('GOOGLE_API_URL') + 'oauth2/v2/userinfo', {
        headers: { authorization: `Bearer ${token}` },
      })
      .toPromise();

    return { id: result.data.id, name: result.data.given_name };
  }
}
