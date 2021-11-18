import { PartialConstructor } from 'src/modules/shared/classes/partial-constructor';
import { IsString, IsDefined } from 'class-validator';

export class UpdatePaymentImageDto extends PartialConstructor<UpdatePaymentImageDto> {
  @IsString()
  @IsDefined()
  paymentImage: string;
}
