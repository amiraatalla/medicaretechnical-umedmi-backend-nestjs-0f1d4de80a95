import { SocialNetworkStrategyService } from './social-network-strategy.service';
import { SocialNetworkServiceInterface } from '../../../shared/interfaces/social-network.service.interface';
import { AuthRepository } from '../../repositories/auth.repository';
import { Inject, Injectable } from '@nestjs/common';
import { SocialAccountTypesEnum } from '../../enums/social-account-types.enum';
import { LINKED_IN_SERVICE } from '../../../shared/services/communicators/linkedin/linkedin.constants';

@Injectable()
export class LinkedInStrategyService extends SocialNetworkStrategyService {
  constructor(@Inject(LINKED_IN_SERVICE) client: SocialNetworkServiceInterface, repo: AuthRepository) {
    super(client, repo);
    this.type = SocialAccountTypesEnum.LINKED_IN;
  }
}
