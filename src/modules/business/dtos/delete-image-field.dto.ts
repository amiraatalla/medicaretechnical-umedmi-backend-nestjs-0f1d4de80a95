import { Type } from 'class-transformer';
import { IsBoolean, IsNotEmpty } from 'class-validator';

export class DeleteImageFieldDto {
  @IsNotEmpty()
  imageName: string;
  @IsNotEmpty()
  imageFieldPath: string;
  @Type(() => Boolean)
  @IsBoolean()
  fromArray = false;
  @Type(() => Boolean)
  @IsBoolean()
  deleteImage = true;
}
