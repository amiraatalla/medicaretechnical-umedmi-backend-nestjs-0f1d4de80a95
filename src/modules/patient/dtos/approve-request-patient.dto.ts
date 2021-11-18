import { IsNotEmpty, IsString } from 'class-validator';

export class ApproveRequestPatientDto {
  @IsString()
  @IsNotEmpty()
  requestUserId: string;
}
