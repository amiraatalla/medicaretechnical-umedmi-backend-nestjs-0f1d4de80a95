import { Injectable } from '@nestjs/common';
import { AddUserComplaintDto } from './dtos/add-user-complaint.dto';
import { UserComplaintRepository } from './repositories/user-complaint.repository';
import { Types, PaginateOptions } from 'mongoose';
import { UserComplaintDto } from './dtos/user-complaint.dto';
@Injectable()
export class UserComplaintService {
  constructor(private readonly _repo: UserComplaintRepository) {}
  async addComplaint(complaint: UserComplaintDto) {
    const found = await this._repo.findOne({ userId: complaint.userId }, { _id: 1, id: 1 });
    return await this._repo.save(
      {
        ...complaint,
      },
      true,
    );
  }
  async getComplaints(query: any = {}, options?: PaginateOptions) {
    options.populate = [
      {
        path: 'userId',
        select: ['_id', 'name', 'username', 'phone', 'email'],
      },
    ];
    return this._repo.paginate(query, options);
  }
}
