import { BaseRepository } from '../../shared/repositories/base-repository';
import { ModelRepository } from '../../shared/decorators/model-repository';
import { Subscription } from '../models/subscription';

@ModelRepository(Subscription)
export class SubscriptionRepository extends BaseRepository<Subscription> {}
