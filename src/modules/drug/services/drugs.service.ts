import { Injectable } from '@nestjs/common';
import { Drug } from '../models/drugs';
import { DrugDto } from '../dtos/drugs.dto';
import { DrugRepository } from '../repositories/drugs.repository';
import { filterDrugDto } from '../dtos/filter.dto';
// import { SearchService } from 'src/modules/search/services/search.service';

@Injectable()
export class DrugService {
  constructor(private drug: DrugRepository, private drugDto: DrugDto) {}

  async create(drugdto: DrugDto): Promise<Drug> {
    return await this.drug.save({ ...drugdto });
  }

  async findOne(id: string) {
    return await this.drug.findById(id);
  }
  async edit(id: string, updates: object) {
    return await this.drug.findByIdAndUpdate(id, updates);
  }
  async delete(id: string) {
    return await this.drug.deleteById(id);
  }

  async getFilter(filterdto: filterDrugDto): Promise<any> {
    const filter: any = {};
    if (filterdto.Country) {
      filter.Country = { $regex: new RegExp('.*' + filterdto.Country.toLocaleLowerCase() + '.*', 'i') };
    }
    if (filterdto.TradeName) {
      filter.TradeName = { $regex: new RegExp('.*' + filterdto.TradeName.toLocaleLowerCase() + '.*', 'i') };
    }
    return await this.drug.find(filter, {}, {});
  }
}
