import { PartialConstructor } from 'src/modules/shared/classes/partial-constructor';
import { IsString, IsOptional, IsEmail } from 'class-validator';

export class EditUserDto extends PartialConstructor<EditUserDto> {
  @IsOptional()
  @IsString()
  type: string;

  @IsOptional()
  @IsString()
  username: string;

  @IsOptional()
  @IsEmail()
  email: string;

  @IsOptional()
  @IsString()
  password: string;

  @IsOptional()
  @IsString()
  quickLoginPassword: string;

  @IsOptional()
  @IsString()
  phoneNumber: string;

  @IsOptional()
  @IsString()
  language: string;
}
