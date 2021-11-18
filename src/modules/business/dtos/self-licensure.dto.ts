import { Transform } from 'class-transformer';
import { IsBoolean, IsDateString, IsEmpty, IsOptional, IsString } from 'class-validator';

export class SelfLicensureDto {
  @IsString()
  @IsOptional()
  documentName: string;
  @IsString()
  @IsOptional()
  issueOrganization: string;
  @IsString()
  @IsOptional()
  type: string;
  @IsString()
  @IsOptional()
  validity: string;
  // @Transform(value => (value as Date).toISOString(); {
  //   toPlainOnly: true;
  // })
  @IsDateString()
  @IsOptional()
  issueDate: Date;

  @IsDateString()
  @IsOptional()
  expiryDate: Date;
  @IsString()
  @IsOptional()
  vadility: string;
  @IsBoolean()
  @IsOptional()
  shareInterests: boolean;
  @IsBoolean()
  @IsOptional()
  showHeadlines: boolean;
  @IsString()
  @IsOptional()
  title: string;
}
