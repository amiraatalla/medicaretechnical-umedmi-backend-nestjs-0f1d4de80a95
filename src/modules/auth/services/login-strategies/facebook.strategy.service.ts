import { SocialNetworkStrategyService } from './social-network-strategy.service';
import { SocialNetworkServiceInterface } from '../../../shared/interfaces/social-network.service.interface';
import { AuthRepository } from '../../repositories/auth.repository';
import { Inject, Injectable } from '@nestjs/common';
import { FACEBOOK_SERVICE } from '../../../shared/services/communicators/facebook/facebook.constants';
import { SocialAccountTypesEnum } from '../../enums/social-account-types.enum';

@Injectable()
export class FacebookStrategyService extends SocialNetworkStrategyService {
  constructor(@Inject(FACEBOOK_SERVICE) client: SocialNetworkServiceInterface, repo: AuthRepository) {
    super(client, repo);
    this.type = SocialAccountTypesEnum.FACEBOOK;
  }
}
