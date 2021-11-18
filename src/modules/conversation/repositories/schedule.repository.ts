import { BaseRepository } from '../../shared/repositories/base-repository';
import { ModelRepository } from '../../shared/decorators/model-repository';
import { Schedule } from '../models/schedule';

@ModelRepository(Schedule)
export class ScheduleRepository extends BaseRepository<Schedule> {}
