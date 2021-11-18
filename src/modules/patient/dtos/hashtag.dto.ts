import { PartialConstructor } from 'src/modules/shared/classes/partial-constructor';
import { IsString, IsNotEmpty, Matches, Contains } from 'class-validator';

export class HashtagDto extends PartialConstructor<HashtagDto> {
  @IsNotEmpty()
  @IsString()
  @Matches(/(?=.*[#])(?=.*[A-Z])(?=.*[a-z]).*$/, { message: 'Data doesn not have #' })
  @Contains('#')
  hashtag: string;
}
