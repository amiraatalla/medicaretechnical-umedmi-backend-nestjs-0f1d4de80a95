import { Module } from '@nestjs/common';
import { UserRateService } from './user-rate.service';
import { UserRateController } from '../api/apps/u-consultation/controllers/user-rate.controller';
import { UserRateRepository } from './repositories/user-rate.repository';
import { TypegooseModule } from 'nestjs-typegoose';
import { UserRate } from './models/user-rate.model';

@Module({
  imports: [TypegooseModule.forFeature([UserRate])],
  providers: [UserRateService, UserRateRepository, UserRate],
  exports: [UserRateService],
})
export class UserRateModule {}
