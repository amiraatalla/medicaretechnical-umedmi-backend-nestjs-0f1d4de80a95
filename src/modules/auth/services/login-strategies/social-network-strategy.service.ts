import { LoginStrategyInterface } from '../../interfaces/login-strategy.interface';
import { LoginRequestInterface } from '../../interfaces/login-request.interface';
import { Auth } from '../../models/auth';
import { AuthRepository } from '../../repositories/auth.repository';
import { InvalidSocialAccountException } from '../../exceptions/invalid-social-account.exception';
import { SocialNetworkServiceInterface } from '../../../shared/interfaces/social-network.service.interface';

export class SocialNetworkStrategyService implements LoginStrategyInterface {
  protected type: string;

  constructor(private socialClient: SocialNetworkServiceInterface, private repo: AuthRepository) {}

  async login(request: LoginRequestInterface): Promise<Auth> {
    let socialAccount = null;

    try {
      socialAccount = await this.socialClient.getProfile(request.password);
    } catch (e) {
      throw new InvalidSocialAccountException();
    }

    const auth = await this.repo.findByLinkedAccountId(this.type, socialAccount.id);

    if (auth) {
      return auth;
    }

    throw new InvalidSocialAccountException();
  }
}
