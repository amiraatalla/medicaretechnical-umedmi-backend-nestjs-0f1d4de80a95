import { Injectable } from '@nestjs/common';
import { AddUserRateDto } from './dtos/add-user-rate.dto';
import { UserRateEnum } from './enums/user-rate.enum';
import { UserRateRepository } from './repositories/user-rate.repository';
import { Types, PaginateOptions } from 'mongoose';
import { UserRateDto } from './dtos/user-rate.dto';
@Injectable()
export class UserRateService {
  constructor(private readonly _repo: UserRateRepository) {}
  async addRate(rate: UserRateDto) {
    const found = await this._repo.findOne({ userId: rate.userId }, { _id: 1, id: 1 });
    return await this._repo.save(
      {
        ...rate,
        ...(found ? { id: found.id } : {}),
      },
      !found,
    );
  }
  async getRates(query: any = {}, options?: PaginateOptions) {
    options.populate = [
      {
        path: 'userId',
        select: ['_id', 'name', 'username', 'phone', 'email'],
      },
    ];
    return this._repo.paginate(query, options);
  }
}
