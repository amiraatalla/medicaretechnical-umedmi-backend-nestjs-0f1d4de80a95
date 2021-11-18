import { PartialConstructor } from 'src/modules/shared/classes/partial-constructor';
import { IsArray, ValidateNested, IsString, IsNotEmpty, IsDefined } from 'class-validator';
import { InvitedEmails } from 'src/modules/shared/models/invitedEmails';
import { Type } from 'class-transformer';
import { InvitedPhoneNumbers } from 'src/modules/shared/models/invitedPhoneNumbers';

export class SendInvitationDto extends PartialConstructor<SendInvitationDto> {
  @IsArray()
  @ValidateNested()
  @Type(() => InvitedEmails)
  emails: Array<InvitedEmails>;

  @IsArray()
  @ValidateNested()
  @Type(() => InvitedPhoneNumbers)
  phones: Array<InvitedPhoneNumbers>;

  @IsString()
  @IsNotEmpty()
  @IsDefined()
  name: string;
}
