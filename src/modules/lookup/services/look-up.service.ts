import { LookUp } from '../models/lookup';
import { Injectable } from '@nestjs/common';
import { LookUptDto } from '../dtos/look-up.dto';
import { LookUpRepository } from '../repositories/look-up.repository';

@Injectable()
export class LookUpService {
  constructor(private repo: LookUpRepository) {}

  async execute(request: LookUptDto): Promise<LookUp> {
    return await this.repo.save({ ...request });
  }

  async getAll(type: string): Promise<Array<LookUp>> {
    return await this.repo.getAll(type);
  }

  async edit(id: string, updates: object) {
    return await this.repo.findByIdAndUpdate(id, updates);
  }

  async delete(id: string) {
    return await this.repo.deleteById(id);
  }
}
