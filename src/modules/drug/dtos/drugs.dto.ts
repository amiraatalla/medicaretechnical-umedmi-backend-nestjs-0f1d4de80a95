import { PartialConstructor } from 'src/modules/shared/classes/partial-constructor';
import { IsOptional, IsString, IsArray, IsNotEmpty, IsNumber } from 'class-validator';

export class DrugDto extends PartialConstructor<DrugDto> {
  @IsOptional()
  @IsString()
  TradeName?: string;

  @IsOptional()
  @IsArray()
  ActiveIngredients?: Array<string>;

  @IsOptional()
  @IsString()
  DrugGroup?: string;

  @IsOptional()
  @IsString()
  MainGroup?: string;

  @IsOptional()
  @IsString()
  AdvisedDose?: string;

  @IsOptional()
  @IsString()
  Form?: string;

  @IsOptional()
  @IsString()
  PackContent?: string;

  @IsOptional()
  @IsArray()
  DrugCompany?: Array<string>;

  @IsOptional()
  @IsNumber()
  Price?: number;

  @IsOptional()
  @IsString()
  PictureNumber?: string;

  @IsOptional()
  @IsString()
  Picture?: string;

  @IsOptional()
  @IsArray()
  SimilarProductNames?: Array<string>;

  @IsOptional()
  @IsString()
  Country?: string;
}
