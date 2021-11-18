import { Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';
import { LookUp } from './models/lookup';
import { LookUpService } from './services/look-up.service';
import { LookUpRepository } from './repositories/look-up.repository';

@Module({
  imports: [TypegooseModule.forFeature([LookUp])],
  providers: [LookUpService, LookUpRepository],
  exports: [LookUpService],
})
export class LookUpModule {}
