import { BaseRepository } from '../../shared/repositories/base-repository';
import { Message } from '../models/message';
import { ModelRepository } from '../../shared/decorators/model-repository';

@ModelRepository(Message)
export class MessageRepository extends BaseRepository<Message> {}
