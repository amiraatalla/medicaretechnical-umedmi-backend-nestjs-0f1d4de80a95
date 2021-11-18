import { SocialNetworkServiceInterface } from '../../../interfaces/social-network.service.interface';
import { HttpService, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class LinkedInCommunicatorService implements SocialNetworkServiceInterface {
  constructor(private httpService: HttpService, private configService: ConfigService) {}

  async getProfile(token: string): Promise<{ id: string; name: string }> {
    const result = await this.httpService
      .get(this.configService.get('LINKED_IN_API_URL') + 'me', { headers: { authorization: `Bearer ${token}` } })
      .toPromise();

    return {
      id: result.data.id,
      name: `${result.data.localizedFirstName} ${result.data.localizedLastName}`,
    };
  }
}
