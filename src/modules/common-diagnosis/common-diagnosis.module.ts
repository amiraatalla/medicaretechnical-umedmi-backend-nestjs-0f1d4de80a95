import { Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';
import { CommonDiagnosis } from './models/common-diagnosis.entity';
import { CommonDiagnosisRepository } from './repositories/common-diagnosis.repository';
import { CommonDiagnosisService } from './services/common-diagnosis.service';
import { CommonDiagnosisDto } from './dtos/common-diagnosis.dto';
import { CsvModule } from 'nest-csv-parser';
import { UdeUser } from '../ude-user/models/ude-user';
import { UdeUserRepository } from '../ude-user/repositories/ude-user.respository';

@Module({
  imports: [TypegooseModule.forFeature([CommonDiagnosis, UdeUser]), CsvModule],
  providers: [CommonDiagnosisRepository, CommonDiagnosisService, CommonDiagnosisDto, UdeUserRepository],
  exports: [CommonDiagnosisService],
})
export class CommonDiagnosisModule {}
