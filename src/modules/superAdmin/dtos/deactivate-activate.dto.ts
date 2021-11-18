import { PartialConstructor } from 'src/modules/shared/classes/partial-constructor';
import { IsArray, IsString, IsNotEmpty, IsDefined, IsEmail, IsOptional, IsBoolean } from 'class-validator';

export class DeactivateActivateDto extends PartialConstructor<DeactivateActivateDto> {
  @IsString()
  @IsNotEmpty()
  @IsDefined()
  id: string;

  @IsBoolean()
  @IsNotEmpty()
  @IsDefined()
  isActive: boolean;
}
