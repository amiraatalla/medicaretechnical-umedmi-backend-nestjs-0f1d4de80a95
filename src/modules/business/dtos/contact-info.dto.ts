import { PartialConstructor } from '../../shared/classes/partial-constructor';
import { IsString, IsOptional } from 'class-validator';

export class ContactInfoDto extends PartialConstructor<ContactInfoDto> {
  @IsString()
  @IsOptional()
  contactInfoType: string;

  @IsString()
  @IsOptional()
  contactInfoLink: string;
}
