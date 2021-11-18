import { ModelRepository } from '../../shared/decorators/model-repository';
import { InvitedPhoneNumbers } from '../models/invitedPhoneNumbers';
import { BaseRepository } from './base-repository';

@ModelRepository(InvitedPhoneNumbers)
export class InvitedPhoneNumbersRepository extends BaseRepository<InvitedPhoneNumbers> {}
