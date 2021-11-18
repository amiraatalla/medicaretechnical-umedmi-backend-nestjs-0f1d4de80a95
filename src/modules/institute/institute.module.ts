import { Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';
import { Institute } from './models/institue';
import { InstituteRepository } from './repositories/institute.respository';
import { InstituteService } from './services/institute.service';

@Module({
  imports: [TypegooseModule.forFeature([Institute])],
  providers: [InstituteRepository, InstituteService],
  exports: [InstituteService],
})
export class InstituteModule {}
