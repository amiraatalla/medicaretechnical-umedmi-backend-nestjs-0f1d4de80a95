import { PartialConstructor } from 'src/modules/shared/classes/partial-constructor';
import { IsString } from 'class-validator';

export class DocumentUploadDto extends PartialConstructor<DocumentUploadDto> {
  @IsString()
  name: string;
}
