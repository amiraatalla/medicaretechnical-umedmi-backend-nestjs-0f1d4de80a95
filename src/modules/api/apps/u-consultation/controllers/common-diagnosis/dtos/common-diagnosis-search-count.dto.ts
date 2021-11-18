import { PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { CommonDiagnosisDto } from 'src/modules/common-diagnosis/dtos/common-diagnosis.dto';

export class CommonDiagnosisSearchCountDto extends PartialType(CommonDiagnosisDto) {
  @IsString()
  @IsNotEmpty()
  ICDCode: string;
}
