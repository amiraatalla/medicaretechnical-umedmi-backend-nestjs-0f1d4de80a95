import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CommonDiagnosis } from '../models/common-diagnosis.entity';
import { CommonDiagnosisDto } from '../dtos/common-diagnosis.dto';
import { CommonDiagnosisRepository } from '../repositories/common-diagnosis.repository';
import { CommonDiagnosisfilterDto } from '../dtos/filter-common-diagnosis.dto';
import { Readable } from 'stream';
import { CsvParser } from 'nest-csv-parser';
import { BaseModel } from 'src/modules/shared/models/base-model';
import { UdeUserRepository } from 'src/modules/ude-user/repositories/ude-user.respository';
import { Speciality } from 'src/modules/business/models/speciality';
import { Types } from 'mongoose';
import { filterDto } from 'src/modules/icd/dtos/filter.dto';
@Injectable()
export class CommonDiagnosisService {
  constructor(
    private commondiagnosis: CommonDiagnosisRepository,
    private readonly csvParser: CsvParser,
    private readonly udeUserRepo: UdeUserRepository,
  ) {}

  async create(commondiagnosisdto: CommonDiagnosisDto): Promise<CommonDiagnosis> {
    const isExist = await this.commondiagnosis.findOne({ ICDCode: commondiagnosisdto.ICDCode });
    // if (isExist) throw new ForbiddenException('Forbidden', 'This ICDCode has already been added');
    // const specialties = commondiagnosisdto.Specialities.map(speciality => ({ speciality, count: 0 }));
    // delete commondiagnosisdto.Specialities;
    return await this.commondiagnosis.save({ ...commondiagnosisdto });
  }

  async findOne(id: string): Promise<CommonDiagnosis> {
    return await this.commondiagnosis.findById(id);
  }

  async edit(id: string, updates: CommonDiagnosisDto): Promise<CommonDiagnosis> {
    return await this.commondiagnosis.findByIdAndUpdate(id, updates);
  }

  async delete(id: string): Promise<any> {
    return await this.commondiagnosis.deleteById(id);
  }

  async search(filterDto: CommonDiagnosisfilterDto): Promise<any> {
    const filter: any = {};
    if (filterDto.CodeVersion) {
      filter.CodeVersion = { $regex: new RegExp('.*' + filterDto.CodeVersion.toLocaleLowerCase() + '.*', 'i') };
    }
    if (filterDto.Diagnosis) {
      filter.Diagnosis = { $regex: new RegExp('.*' + filterDto.Diagnosis.toLocaleLowerCase() + '.*', 'i') };
    }
    if (filterDto.Country) {
      filter.Countries = { $elemMatch: { countryCode: filterDto.Country } };
    }
    if (filterDto.Specialty) {
      filter.Specialities = {
        $elemMatch: { speciality: { $regex: new RegExp('.*' + filterDto.Specialty.toLocaleLowerCase() + '.*', 'i') } },
      };
    }
    const { page, limit } = filterDto;
    return await this.commondiagnosis.paginate(filter, { page, limit });
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  async import(file: any): Promise<void> {
    const stream = Readable.from(file.buffer);
    const rows: any = await this.csvParser.parse(stream, BaseModel);
    rows.list.forEach(async cd => {
      const data = cd[Object.keys(cd)[0]].split(',');
      const isExist = await this.commondiagnosis.findOne({ ICDCode: data[1] });
      if (!isExist) {
        const commondiagnosie = {
          CodeVersion: <string>data[0],
          ICDCode: data[2],
          Diagnosis: data[3],
          VisitType: [
            {
              new: data[4],
              followup: data[5],
            },
          ],
          Gender: [
            {
              male: data[6],
              female: data[7],
            },
          ],
          Specialities: [{ speciality: data[1], count: 0 }],
          Countries: [
            {
              countryCode: 'EG',
              count: data[8],
            },
            {
              countryCode: 'SA',
              count: data[9],
            },
          ],
          AgeGroup: [],
        };
        await this.commondiagnosis.save({ ...commondiagnosie });
      }
    });
  }
  async searchIcdCode(searchDto: CommonDiagnosisDto, udeUserId: string | Types.ObjectId) {
    const { ICDCode } = searchDto;
    const commomdiagnosisPromise = this.commondiagnosis.findOne({ ICDCode });
    const udeUserPromise = this.udeUserRepo.findById(<string>udeUserId, {}, [{ path: 'speciality' }]);
    const [diagnosisDoc, userDoc] = await Promise.all([commomdiagnosisPromise, udeUserPromise]);

    if (!userDoc) {
      throw new UnauthorizedException('User Id not found');
    }

    const specialityString = userDoc.speciality
      ? <any>(<Speciality>userDoc.speciality).mainSpeciality['en']
      : 'Internal Medicine';

    const countryCode = userDoc.countryCode ? userDoc.countryCode : 'SA';
    if (!diagnosisDoc) {
      return this.create({
        ...searchDto,
        Specialities: [{ count: 1, speciality: specialityString }],
        Countries: [{ count: 1, countryCode: userDoc.countryCode }],
      });
    }
    const countryIndex = diagnosisDoc.Countries.findIndex(country => country.countryCode == countryCode);

    const specialityIndex = diagnosisDoc.Specialities.findIndex(
      speciality => speciality.speciality == specialityString,
    );
    if (countryIndex == -1) {
      diagnosisDoc.Countries.push({ count: 1, countryCode: countryCode });
    } else {
      diagnosisDoc.Countries[countryIndex].count++;
    }
    if (specialityIndex == -1) {
      diagnosisDoc.Specialities.push({ count: 1, speciality: specialityString });
    } else {
      diagnosisDoc.Specialities[countryIndex].count++;
    }
    return this.commondiagnosis.save(diagnosisDoc);
  }
}
