import { PartialConstructor } from 'src/modules/shared/classes/partial-constructor';
import { IsString, IsNotEmpty, IsEmail } from 'class-validator';

export class ShareDto extends PartialConstructor<ShareDto> {
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  share_with: string;
}
