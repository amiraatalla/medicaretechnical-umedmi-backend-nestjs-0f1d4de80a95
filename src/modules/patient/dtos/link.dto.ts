import { PartialConstructor } from 'src/modules/shared/classes/partial-constructor';
import { IsString, IsNotEmpty, IsUrl } from 'class-validator';

export class LinkDto extends PartialConstructor<LinkDto> {
  @IsNotEmpty()
  @IsString()
  @IsUrl({
    require_protocol: true,
    require_valid_protocol: true,
  })
  link: string;
}
