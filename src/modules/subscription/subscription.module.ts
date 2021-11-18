import { Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';
import { Subscription } from './models/subscription';
import { SubscriptionRepository } from './respositories/subscription.repository';
import { SubscriptionService } from './services/subscription.service';
import { AuthRepository } from '../auth/repositories/auth.repository';
import { Auth } from '../auth/models/auth';
import { MandrillService } from '../shared/services/communicators/email/mandrill.service';
import { InvitedEmailsRepository } from '../shared/repositories/invitedEmails.repository';
import { InvitedPhoneNumbersRepository } from '../shared/repositories/invitedPhones.repository';
import { InvitedEmails } from '../shared/models/invitedEmails';
import { InvitedPhoneNumbers } from '../shared/models/invitedPhoneNumbers';

@Module({
  imports: [TypegooseModule.forFeature([Subscription, Auth, InvitedEmails, InvitedPhoneNumbers])],
  providers: [
    SubscriptionRepository,
    SubscriptionService,
    AuthRepository,
    MandrillService,
    InvitedEmailsRepository,
    InvitedPhoneNumbersRepository,
  ],
  exports: [
    SubscriptionService,
    AuthRepository,
    MandrillService,
    InvitedEmailsRepository,
    InvitedPhoneNumbersRepository,
  ],
})
export class SubscriptionModule {}
