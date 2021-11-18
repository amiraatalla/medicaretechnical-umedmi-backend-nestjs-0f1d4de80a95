import { Global, HttpModule, HttpService, Module } from '@nestjs/common';
import { HashService } from './services/hash.service';
import { SMS_PROVIDER } from './services/communicators/sms/sms.constants';
import { SmsMisrCommunicatorService } from './services/communicators/sms/sms-misr.communicator.service';
import { ConfigService } from '@nestjs/config';
import { SmsMockCommunicatorService } from './services/communicators/sms/sms-mock.communicator.service';
import { HelpersModule } from './helpers/helpers.module';
import { EMAIL_PROVIDER } from './services/communicators/email/email-provider.interface';
import { MandrillService } from './services/communicators/email/mandrill.service';
import { FACEBOOK_SERVICE } from './services/communicators/facebook/facebook.constants';
import { FacebookService } from './services/communicators/facebook/facebook.service';
import { LINKED_IN_SERVICE } from './services/communicators/linkedin/linkedin.constants';
import { LinkedInCommunicatorService } from './services/communicators/linkedin/linkedin.communicator.service';
import { GOOGLE_SERVICE } from './services/communicators/google/google.constants';
import { GoogleCommunicatorService } from './services/communicators/google/google.communicator.service';
import { SocialAccountValidator } from '../api/validators/social-account.validator';
import { CodeGeneratorService } from './services/code-generator.service';

const SMS_PROVIDER_CONFIG = {
  provide: SMS_PROVIDER,
  inject: [ConfigService, HttpService],
  useFactory: (config: ConfigService, httpService: HttpService) => {
    const isSmsEnabled = config.get('SMS_IS_ENABLED');
    return isSmsEnabled === 'true'
      ? new SmsMisrCommunicatorService(httpService, config)
      : new SmsMockCommunicatorService();
  },
};

const EMAIL_PROVIDER_CONFIG = {
  provide: EMAIL_PROVIDER,
  useClass: MandrillService,
};

const FACEBOOK_PROVIDER_CONFIG = {
  provide: FACEBOOK_SERVICE,
  useClass: FacebookService,
};

const LINKED_IN_PROVIDER_CONFIG = {
  provide: LINKED_IN_SERVICE,
  useClass: LinkedInCommunicatorService,
};

const GOOGLE_PROVIDER_CONFIG = {
  provide: GOOGLE_SERVICE,
  useClass: GoogleCommunicatorService,
};

@Global()
@Module({
  imports: [HttpModule, HelpersModule],
  providers: [
    HashService,
    SocialAccountValidator,
    SMS_PROVIDER_CONFIG,
    EMAIL_PROVIDER_CONFIG,
    FACEBOOK_PROVIDER_CONFIG,
    LINKED_IN_PROVIDER_CONFIG,
    GOOGLE_PROVIDER_CONFIG,
    CodeGeneratorService,
  ],
  exports: [
    HashService,
    SMS_PROVIDER_CONFIG,
    EMAIL_PROVIDER_CONFIG,
    FACEBOOK_PROVIDER_CONFIG,
    LINKED_IN_PROVIDER_CONFIG,
    GOOGLE_PROVIDER_CONFIG,
    CodeGeneratorService,
  ],
})
export class SharedModule {}
