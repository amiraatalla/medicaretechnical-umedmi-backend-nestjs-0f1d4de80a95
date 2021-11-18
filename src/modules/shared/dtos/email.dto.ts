import { PartialConstructor } from '../classes/partial-constructor';
import { IsOptional, IsString, IsEmail } from 'class-validator';

export class EmailDto extends PartialConstructor<EmailDto> {
  @IsOptional()
  @IsString()
  emailType: string;

  @IsOptional()
  @IsEmail()
  email: string;
}
