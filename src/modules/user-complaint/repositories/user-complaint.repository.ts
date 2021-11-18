import { ModelRepository } from '../../shared/decorators/model-repository';
import { BaseRepository } from '../../shared/repositories/base-repository';
import { UserComplaint } from '../models/user-complaint.model';

@ModelRepository(UserComplaint)
export class UserComplaintRepository extends BaseRepository<UserComplaint> {}
