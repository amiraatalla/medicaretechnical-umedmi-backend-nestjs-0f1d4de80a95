import { Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';
import { Icd } from './models/icd';
import { IcdRepository } from './repositories/icd.repository';
import { IcdService } from './services/icd.service';
import { IcdDto } from './dtos/icd.dto';
import { filterDto } from './dtos/filter.dto';
@Module({
  imports: [TypegooseModule.forFeature([Icd])],
  providers: [IcdRepository, IcdService, IcdDto, filterDto],
  exports: [IcdService],
})
export class IcdModule {}
