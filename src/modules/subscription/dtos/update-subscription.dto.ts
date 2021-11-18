import { PartialConstructor } from 'src/modules/shared/classes/partial-constructor';
import { IsString, IsNumber, IsEnum, IsOptional, IsBoolean } from 'class-validator';
import { SubscriptionTypesEnum, UserTypesEnum } from '../enums/subscription.enum';

export class UpdateSubscriptionDto extends PartialConstructor<UpdateSubscriptionDto> {
  @IsOptional()
  @IsEnum(SubscriptionTypesEnum)
  type: string;

  @IsOptional()
  @IsEnum(UserTypesEnum)
  userType: string;

  @IsNumber()
  @IsOptional()
  priceMonthly: number;

  @IsNumber()
  @IsOptional()
  priceAnnualy: number;

  @IsString()
  @IsOptional()
  messagesMonthly: string;

  @IsString()
  @IsOptional()
  inMailSMSMonthly: string;

  @IsNumber()
  @IsOptional()
  storage: number;

  @IsString()
  @IsOptional()
  sharing: string;

  @IsString()
  @IsOptional()
  outboundPatientSharing: string;

  @IsString()
  @IsOptional()
  viewSharedPatients: string;

  @IsOptional()
  @IsString()
  pollFeatureMonthly: string;

  @IsOptional()
  @IsString()
  messageRetentionAndDeletion: string;

  @IsOptional()
  @IsString()
  umedmiBotResponses: string;

  @IsOptional()
  @IsString()
  callVideoFeature: string;

  @IsOptional()
  @IsString()
  autoScheduler: string;

  @IsOptional()
  @IsString()
  ADSBlocker: string;

  @IsOptional()
  @IsString()
  templates: string;

  @IsOptional()
  @IsString()
  clinicSheetBuilder: string;

  @IsOptional()
  @IsString()
  dashboard: string;

  @IsOptional()
  @IsString()
  printing: string;

  @IsOptional()
  @IsString()
  voiceNotesAndUploads: string;

  @IsOptional()
  @IsString()
  voiceRecognition: string;

  @IsOptional()
  @IsString()
  handwritingRecognition: string;

  @IsOptional()
  @IsString()
  extractForms: string;

  @IsOptional()
  @IsBoolean()
  isActive: boolean;
}
