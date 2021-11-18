import { BaseRepository } from '../../shared/repositories/base-repository';
import { Conversation } from '../models/conversation';
import { ModelRepository } from '../../shared/decorators/model-repository';

@ModelRepository(Conversation)
export class ConversationRepository extends BaseRepository<Conversation> {}
