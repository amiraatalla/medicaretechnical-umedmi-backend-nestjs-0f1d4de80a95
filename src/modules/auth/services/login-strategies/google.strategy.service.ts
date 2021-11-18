import { SocialNetworkStrategyService } from './social-network-strategy.service';
import { SocialNetworkServiceInterface } from '../../../shared/interfaces/social-network.service.interface';
import { AuthRepository } from '../../repositories/auth.repository';
import { Inject, Injectable } from '@nestjs/common';
import { SocialAccountTypesEnum } from '../../enums/social-account-types.enum';
import { GOOGLE_SERVICE } from '../../../shared/services/communicators/google/google.constants';

@Injectable()
export class GoogleStrategyService extends SocialNetworkStrategyService {
  constructor(@Inject(GOOGLE_SERVICE) client: SocialNetworkServiceInterface, repo: AuthRepository) {
    super(client, repo);
    this.type = SocialAccountTypesEnum.GOOGLE;
  }
}
