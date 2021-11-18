import { ModelRepository } from '../../shared/decorators/model-repository';
import { InvitedEmails } from '../models/invitedEmails';
import { BaseRepository } from './base-repository';

@ModelRepository(InvitedEmails)
export class InvitedEmailsRepository extends BaseRepository<InvitedEmails> {}
