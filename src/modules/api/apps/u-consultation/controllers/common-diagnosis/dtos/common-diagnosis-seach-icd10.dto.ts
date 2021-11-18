import { OmitType } from '@nestjs/swagger';
import { CommonDiagnosisDto } from 'src/modules/common-diagnosis/dtos/common-diagnosis.dto';

export class CommonDiagnosisSeachIcd10Dto extends OmitType(CommonDiagnosisDto, [
  'AgeGroup',
  'Gender',
  'Specialities',
  'VisitType',
]) {}
