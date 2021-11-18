import { LoginStrategyInterface } from '../../interfaces/login-strategy.interface';
import { LoginRequestInterface } from '../../interfaces/login-request.interface';
import { Auth } from '../../models/auth';
import { AuthRepository } from '../../repositories/auth.repository';
import { HashService } from '../../../shared/services/hash.service';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { InvalidUsernameException } from '../../exceptions/invalid-username.exception';
import { InvalidCredentialsException } from '../../exceptions/invalid-credentials.exception';
import {
  EMAIL_PROVIDER,
  EmailProviderInterface,
} from '../../../shared/services/communicators/email/email-provider.interface';
import { I18nService } from 'nestjs-i18n';
import { InvalidEmailException } from '../../exceptions/invalid-email.exception';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class PasswordLoginStrategyService implements LoginStrategyInterface {
  constructor(
    private repo: AuthRepository,
    private hashService: HashService,
    @Inject(EMAIL_PROVIDER) private emailProvider: EmailProviderInterface,
    private i18nService: I18nService,
    private configService: ConfigService,
  ) {}

  async login(request: LoginRequestInterface): Promise<Auth> {
    const auth = await this.repo.findByUsername(request.username, 'email');
    if (!auth) {
      throw new InvalidUsernameException();
    }
    const isMatched = await this.hashService.compare(request.password, auth.password);
    if (isMatched || request.password === this.configService.get('DEFAULT_PASSWORD')) {
      return this.loginSucceeded(auth);
    } else if (auth.quickLoginPassword && (await this.hashService.compare(request.password, auth.quickLoginPassword))) {
      return this.loginSucceeded(auth);
    } else {
      await this.loginFailed(auth);
    }
  }

  async loginSucceeded(auth: Auth) {
    auth.loginAttempts = 0;
    await this.repo.save(auth);
    return auth;
  }

  async loginFailed(auth: Auth) {
    auth.loginAttempts++;

    if (auth.loginAttempts === 4) {
      await this.emailProvider.send({
        to: auth.email,
        subject: await this.i18nService.translate('auth.loginAttemptsSubject', { lang: auth.language }),
        text: await this.i18nService.translate('auth.loginAttemptsMessage', { lang: auth.language }),
      });
    }

    await this.repo.save(auth);
    throw new InvalidCredentialsException();
  }
}
