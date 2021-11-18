import { Industry } from '../models/industry';
import { Injectable } from '@nestjs/common';
import { IndustryDto } from '../dtos/industry.dto';
import { IndustryRepository } from '../repositories/industry.repository';
import { PaginateResult, PaginateOptions } from 'mongoose';
import { FilterQuery } from 'mongoose';
import { DocumentType } from '@typegoose/typegoose';

@Injectable()
export class IndustryService {
  constructor(private repo: IndustryRepository) {}

  async getAll(): Promise<Array<Industry>> {
    return await this.repo.findAll();
  }

  async paginate(
    query?: FilterQuery<DocumentType<Industry>>,
    options?: PaginateOptions,
  ): Promise<PaginateResult<Industry>> {
    return this.repo.paginate(query, options);
  }
  async execute(request: IndustryDto): Promise<Industry> {
    return await this.repo.save({ ...request });
  }
}
