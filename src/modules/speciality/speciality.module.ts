import { Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';
import { Speciality } from './models/speciality';
import { SpecialityRepository } from './repositories/speciality.repository';
import { SpecialityService } from './services/speciality.service';

@Module({
  imports: [TypegooseModule.forFeature([Speciality])],
  providers: [SpecialityRepository, SpecialityService],
  exports: [SpecialityService],
})
export class SpecialityModule {}
