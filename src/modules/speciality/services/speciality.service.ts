import { Speciality } from '../models/speciality';
import { SpecialityRepository } from '../repositories/speciality.repository';
import { SubSpecialityDto, SpecialityDto } from '../dtos/speciality.dto';
import { Injectable } from '@nestjs/common';
import { LocalizedField } from 'src/modules/shared/models/localizedfield';

@Injectable()
export class SpecialityService {
  constructor(private repo: SpecialityRepository) {}

  async addMainSpeciality(request: SpecialityDto): Promise<Speciality> {
    const mainSpeciality = await this.repo.save({ ...request });
    return mainSpeciality;
  }

  async addSubSpeciality(id: string, request: SubSpecialityDto): Promise<Speciality> {
    return await this.repo.addSubSpeciality(id, request.subSpeciality);
  }

  async getAllMainSpeciality(): Promise<Array<Speciality>> {
    const mainSpecialities = await this.repo.findAll();
    return mainSpecialities;
  }

  async getMainSpeciality(businessType: string): Promise<Array<Speciality>> {
    const isArabic = /[\u0600-\u06FF]/;
    let query;
    if (isArabic.test(businessType)) query = { 'businessType.ar': businessType };
    else query = { 'businessType.en': businessType };
    const mainSpecialities = await this.repo.findAllWithFilter(query);
    return mainSpecialities;
  }

  async getSubSpeciality(id: string): Promise<Array<LocalizedField>> {
    const mainSpeciality = await this.repo.findById(id, {});
    const { subSpeciality } = mainSpeciality;
    return subSpeciality;
  }

  async seed(data) {
    await this.repo.remove({});
    return await this.repo.insertMany(data);
  }

  async delete(id: string) {
    return await this.repo.deleteById(id);
  }
}
