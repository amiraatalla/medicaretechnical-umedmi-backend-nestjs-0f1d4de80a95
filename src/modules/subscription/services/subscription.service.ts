import { Injectable } from '@nestjs/common';
import { SubscriptionRepository } from '../respositories/subscription.repository';
import { Subscription } from '../models/subscription';
import { SubscriptionPackages } from '../../../seed/subscription/data';
import { SubscriptionDto } from '../dtos/subscription.dto';
import { Auth } from 'src/modules/auth/models/auth';
import { AuthRepository } from 'src/modules/auth/repositories/auth.repository';
import { MandrillService } from 'src/modules/shared/services/communicators/email/mandrill.service';
import { InvitedEmailsRepository } from 'src/modules/shared/repositories/invitedEmails.repository';
import { InvitedPhoneNumbersRepository } from 'src/modules/shared/repositories/invitedPhones.repository';
import { SendInvitationDto } from '../dtos/send-invitation.dto';
import { UpdateSubscriptionDto } from '../dtos/update-subscription.dto';

@Injectable()
export class SubscriptionService {
  constructor(
    private repo: SubscriptionRepository,
    private authRepository: AuthRepository,
    private mandrillService: MandrillService,
    private invitedEmailsRepo: InvitedEmailsRepository,
    private invitedPhoneNumbersRepo: InvitedPhoneNumbersRepository,
  ) {}

  seed(): Array<Promise<Subscription>> {
    return SubscriptionPackages.map(async (item: SubscriptionDto) => {
      return await this.repo.findOne({ type: item.type }).then(async found => {
        if (found) return Promise.resolve(null);

        return Promise.resolve(await this.repo.save(item, true));
      });
    });
  }

  async getAll(filter, pagination) {
    return await this.repo.paginate(filter, pagination);
  }

  async getIndiv(): Promise<Array<Subscription>> {
    return await this.repo.findAllWithFilter({ userType: 'indiv', isActive: true });
  }

  async getCorp(): Promise<Array<Subscription>> {
    return await this.repo.findAllWithFilter({ userType: 'corp', isActive: true });
  }

  async subscribe(id: string, auth: Auth) {
    const user = await this.authRepository.findById(auth.id);
    const subscription = await this.repo.findById(id);

    if (user.hasAppliedInviationCode && subscription.type === 'silver')
      return await this.authRepository.findByIdAndUpdate(user.id, {
        currentPackageStartingDate: new Date(),
        currentPackageId: id,
        hasAppliedInviationCode: false,
      });
    else if (user.sentInvitationsCount >= 10 && !user.sentInvitationsCountLimited && subscription.type === 'silver')
      return await this.authRepository.findByIdAndUpdate(user.id, {
        currentPackageStartingDate: new Date(),
        currentPackageId: id,
        sentInvitationsCountLimited: true,
      });
    else
      return await this.authRepository.findByIdAndUpdate(user.id, {
        currentPackageId: id,
      });
  }

  async sendInvitation(data: SendInvitationDto, auth: Auth) {
    const { emails, phones, name } = data;
    const emailsPromises = emails.map(email => this.invitedEmailsRepo.save(email));
    const phonesPromises = phones.map(phone => this.invitedPhoneNumbersRepo.save(phone));
    Promise.all(emailsPromises);
    Promise.all(phonesPromises);
    await this.mandrillService.send({
      to: emails[0].email,
      subject: 'UmedMi Invitation',
      text: `Dr ${name} I have invited you to join our outstanding Health providers On UmedMi board \n Invitation Code:  ${auth.invitationCode}`,
    });

    const user = await this.authRepository.findById(auth.id);
    let subscription;
    if (user.role === 'clinic') subscription = await this.repo.findOne({ type: 'gold', userType: 'indiv' });
    else subscription = await this.repo.findOne({ type: 'gold', userType: 'corp' });
    console.log('sub', subscription);
    if (user.sentInvitationsCount === 10)
      await this.authRepository.findByIdAndUpdate(user.id, {
        sentInvitationsCountLimited: true,
        currentPackageId: subscription.id,
      });
    if (user.sentInvitationsCountLimited) return false;
    await this.authRepository.findByIdAndUpdate(user.id, { $inc: { sentInvitationsCount: 1 } });
    return true;
  }

  async verifyCode(code: string, user: Auth) {
    let subscription;
    if (user.role === 'clinic') subscription = await this.repo.findOne({ type: 'gold', userType: 'indiv' });
    else subscription = await this.repo.findOne({ type: 'gold', userType: 'corp' });
    await this.authRepository.findByIdAndUpdate(user.id, {
      hasAppliedInviationCode: true,
      appliedInviationCode: code,
      currentPackageId: subscription.id,
    });
  }

  async updatePaymentImage(paymentImage: string, user: Auth) {
    return await this.authRepository.findByIdAndUpdate(user.id, { paymentImage: paymentImage });
  }

  async edit(id: string, updates: UpdateSubscriptionDto) {
    return await this.repo.findByIdAndUpdate(id, updates);
  }

  async activate(id: string) {
    return await this.repo.findByIdAndUpdate(id, { isActive: true });
  }

  async deactivate(id: string) {
    return await this.repo.findByIdAndUpdate(id, { isActive: false });
  }

  async listSubscriptionRequest() {
    return await this.authRepository.findAllWithFilter(
      {
        currentPackageId: { $exists: true },
        currentPackageStartingDate: { $exists: false },
      },
      // [
      //   {
      //     path: 'currentPackageId',
      //   },
      // ],
    );
  }

  async reviewSubscription(userId: string, req) {
    if (req.isApproved === true)
      return await this.authRepository.findByIdAndUpdate(userId, {
        currentPackageStartingDate: new Date(),
      });
    else
      return await this.authRepository.findByIdAndUpdate(userId, {
        subscriptionComment: req.comments,
      });
  }
}
