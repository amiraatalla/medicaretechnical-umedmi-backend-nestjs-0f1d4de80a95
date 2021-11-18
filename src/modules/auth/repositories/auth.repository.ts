import { Auth } from '../models/auth';
import { BaseRepository } from '../../shared/repositories/base-repository';
import { ModelRepository } from '../../shared/decorators/model-repository';

@ModelRepository(Auth)
export class AuthRepository extends BaseRepository<Auth> {
  findByPhone(phoneNumber: string): Promise<Auth> {
    return this.findOne({ phoneNumber });
  }

  findByUsername(username: string, loginField = 'email') {
    return this.findOne({ [loginField]: username });
  }

  findByLinkedAccountId(type: string, accountId: string) {
    return this.findOne({ linkedAccounts: { $elemMatch: { accountId, type } } });
  }

  findInvitaionCodes() {
    return this.findAll().then(data => data.map(ele => ele.invitationCode));
  }
}
