import { Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';
import { Drug } from './models/drugs';
import { DrugRepository } from './repositories/drugs.repository';
import { DrugService } from './services/drugs.service';
import { DrugDto } from '../drug/dtos/drugs.dto';

@Module({
  imports: [TypegooseModule.forFeature([Drug])],
  providers: [DrugRepository, DrugService, DrugDto],
  exports: [DrugService],
})
export class DrugModule {}
