import { Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';
import { Industry } from './models/industry';
import { IndustryRepository } from './repositories/industry.repository';
import { IndustryService } from './services/industry.service';

@Module({
  imports: [TypegooseModule.forFeature([Industry])],
  providers: [IndustryRepository, IndustryService],
  exports: [IndustryService],
})
export class IndustryModule {}
