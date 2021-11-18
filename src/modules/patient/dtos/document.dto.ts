import { PartialConstructor } from 'src/modules/shared/classes/partial-constructor';
import { IsNotEmpty, IsEnum, IsDefined, IsString } from 'class-validator';
import { DocumentEnum } from '../enums/document.enum';

export class DocumentInfoDto {
  @IsEnum(DocumentEnum)
  @IsNotEmpty()
  @IsDefined()
  document: DocumentEnum;
  @IsString()
  id?: string;
  @IsString()
  createdBy: string;
}
