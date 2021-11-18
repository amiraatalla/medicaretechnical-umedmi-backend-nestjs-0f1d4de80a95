import { PartialConstructor } from 'src/modules/shared/classes/partial-constructor';
import { IsOptional, IsString, IsArray } from 'class-validator';

export class IcdDto extends PartialConstructor<IcdDto> {
  @IsOptional()
  @IsString()
  ICDVersion?: string;

  @IsOptional()
  @IsString()
  ID?: string;

  @IsOptional()
  @IsString()
  Organ?: string;

  @IsOptional()
  @IsString()
  diagnosis?: string;

  @IsOptional()
  @IsString()
  GeneralSymptoms?: string;

  @IsOptional()
  @IsString()
  SpecificSymptoms?: string;

  @IsOptional()
  @IsString()
  SymptomsSeeDoctor?: string;

  @IsOptional()
  @IsArray()
  AgeGroup?: Array<string>;

  @IsOptional()
  @IsString()
  Pregnancy?: string;

  @IsOptional()
  @IsArray()
  RelatedConditions?: Array<string>;
}
