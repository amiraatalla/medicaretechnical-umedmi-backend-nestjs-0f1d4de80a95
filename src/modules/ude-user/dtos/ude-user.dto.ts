import { PartialConstructor } from '../../shared/classes/partial-constructor';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsNumberString,
  IsOptional,
  IsPhoneNumber,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { Unique } from 'src/modules/api/validators/unique-mongo.validator';
import { CountryCodeEnum } from 'src/modules/shared/enums/country-code.enum';

export class UdeUserDto extends PartialConstructor<UdeUserDto> {
  @Unique({ modelName: 'UdeUser', field: 'username' })
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  username: string;

  @Unique({ modelName: 'UdeUser', field: 'phone' })
  @IsString()
  @IsNumberString()
  phone: string;

  @IsString()
  @IsOptional()
  speciality?: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(4)
  @MaxLength(4)
  pinCode: string;

  @IsEnum(CountryCodeEnum)
  @IsOptional()
  countryCode: CountryCodeEnum;
}
