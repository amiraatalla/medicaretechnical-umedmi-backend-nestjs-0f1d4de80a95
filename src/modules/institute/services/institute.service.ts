import { Injectable } from '@nestjs/common';
import { Institute } from '../models/institue';
import { InstituteDto } from '../dtos/institute.dto';
import { InstituteRepository } from '../repositories/institute.respository';

@Injectable()
export class InstituteService {
  constructor(private repo: InstituteRepository) {}

  async getAll(): Promise<Array<Institute>> {
    return await this.repo.findAll();
  }

  async execute(request: InstituteDto): Promise<Institute> {
    return await this.repo.save({ ...request });
  }
}
