import { Injectable } from '@nestjs/common';
import { Icd } from '../models/icd';
import { IcdDto } from '../dtos/icd.dto';
import { IcdRepository } from '../repositories/icd.repository';
import { filterDto } from '../dtos/filter.dto';

@Injectable()
export class IcdService {
  constructor(private icd: IcdRepository, private filterdto: filterDto) {}

  async create(icddto: IcdDto): Promise<Icd> {
    return await this.icd.save({ ...icddto });
  }

  async findOne(id: string) {
    return await this.icd.findById(id);
  }
  async edit(id: string, updates: object) {
    return await this.icd.findByIdAndUpdate(id, updates);
  }
  async delete(id: string) {
    return await this.icd.deleteById(id);
  }

  async getFilter(filterdto: filterDto): Promise<any> {
    const filter: any = {};
    if (filterdto.diagnosis) {
      filter.diagnosis = { $regex: new RegExp('.*' + filterdto.diagnosis.toLocaleLowerCase() + '.*', 'i') };
    }
    if (filterdto.ICDVersion) {
      filter.ICDVersion = { $regex: new RegExp('.*' + filterdto.ICDVersion.toLocaleLowerCase() + '.*', 'i') };
    }
    return await this.icd.find(filter, {}, {});
  }
}
