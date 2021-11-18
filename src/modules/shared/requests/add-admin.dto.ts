import { IsString, IsNotEmpty, IsEmail, IsArray, IsOptional } from 'class-validator';
import { Unique } from '../../api/validators/unique-mongo.validator';
import { Auth } from '../../auth/models/auth';

export class AddAdminDto {
  @Unique({ modelName: Auth.name, field: 'username' })
  @IsOptional()
  username?: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @Unique({ modelName: Auth.name, field: 'email' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsArray()
  @IsNotEmpty()
  permissions: Array<string>;
}
