import { Module } from '@nestjs/common';
import { PatientService } from './patient.service';
import { PatientController } from '../api/apps/u-consultation/controllers/patient.controller';
import { TypegooseModule } from 'nestjs-typegoose';
import { Patient } from './models/patient';
import { PatientRepository } from './repositories/patient.repository';
import { NotificationService } from '../utils/notification/notification.service';
import { AuthRepository } from '../auth/repositories/auth.repository';
import { Auth } from '../auth/models/auth';

@Module({
  imports: [TypegooseModule.forFeature([Patient]), TypegooseModule.forFeature([Auth])],
  providers: [PatientService, PatientRepository, Patient, NotificationService, AuthRepository],
  controllers: [],
  exports: [PatientService],
})
export class PatientModule {}
