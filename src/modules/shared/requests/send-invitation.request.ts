import { IsString, IsArray, ValidateNested } from 'class-validator';
import { Email } from '../models/email';
import { Type } from 'class-transformer';
import { Phone } from '../models/phone';
import { InvitedEmails } from '../models/invitedEmails';
import { InvitedPhoneNumbers } from '../models/invitedPhoneNumbers';

export class SendInvitationRequest {
  @IsArray()
  @ValidateNested()
  @Type(() => InvitedEmails)
  emails: Array<InvitedEmails>;

  @IsArray()
  @ValidateNested()
  @Type(() => InvitedPhoneNumbers)
  phones: Array<InvitedPhoneNumbers>;

  @IsString()
  name: string;
}
