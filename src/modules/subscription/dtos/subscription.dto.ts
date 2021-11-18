import { PartialConstructor } from 'src/modules/shared/classes/partial-constructor';
import { IsString, IsNumber, IsNotEmpty, IsEnum, IsDefined } from 'class-validator';
import { SubscriptionTypesEnum, UserTypesEnum } from '../enums/subscription.enum';

export class SubscriptionDto extends PartialConstructor<SubscriptionDto> {
  @IsEnum(SubscriptionTypesEnum)
  @IsNotEmpty()
  @IsDefined()
  type: string;

  @IsEnum(UserTypesEnum)
  @IsNotEmpty()
  @IsDefined()
  userType: string;

  @IsNumber()
  @IsNotEmpty()
  priceMonthly: number;

  @IsNumber()
  @IsNotEmpty()
  priceAnnualy: number;

  @IsString()
  @IsNotEmpty()
  messagesMonthly: string;

  @IsString()
  @IsNotEmpty()
  inMailSMSMonthly: string;

  @IsNumber()
  @IsNotEmpty()
  storage: number;

  @IsString()
  @IsNotEmpty()
  sharing: string;

  @IsString()
  @IsNotEmpty()
  outboundPatientSharing: string;

  @IsString()
  @IsNotEmpty()
  viewSharedPatients: string;

  @IsString()
  pollFeatureMonthly: string;

  @IsString()
  messageRetentionAndDeletion: string;

  @IsString()
  umedmiBotResponses: string;

  @IsString()
  callVideoFeature: string;

  @IsString()
  autoScheduler: string;

  @IsString()
  ADSBlocker: string;

  @IsString()
  templates: string;

  @IsString()
  clinicSheetBuilder: string;

  @IsString()
  dashboard: string;

  @IsString()
  printing: string;

  @IsString()
  voiceNotesAndUploads: string;

  @IsString()
  voiceRecognition: string;

  @IsString()
  handwritingRecognition: string;

  @IsString()
  extractForms: string;
}
