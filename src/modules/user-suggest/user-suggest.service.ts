import { Injectable } from '@nestjs/common';
import { AddUserSuggestDto } from './dtos/add-user-suggest.dto';
import { UserSuggestRepository } from './repositories/user-suggest.repository';
import { Types, PaginateOptions } from 'mongoose';
import { UserSuggestDto } from './dtos/user-suggest.dto';
@Injectable()
export class UserSuggestService {
  constructor(private readonly _repo: UserSuggestRepository) {}
  async addSuggest(suggest: UserSuggestDto) {
    const found = await this._repo.findOne({ userId: suggest.userId }, { _id: 1, id: 1 });
    return await this._repo.save(
      {
        ...suggest,
      },
      true,
    );
  }
  async getSuggests(query: any = {}, options?: PaginateOptions) {
    options.populate = [
      {
        path: 'userId',
        select: ['_id', 'name', 'username', 'phone', 'email'],
      },
    ];
    return this._repo.paginate(query, options);
  }
}
