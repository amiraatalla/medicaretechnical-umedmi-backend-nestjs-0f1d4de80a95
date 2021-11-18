import { prop } from '@typegoose/typegoose';
import { SubscriptionTypesEnum, UserTypesEnum } from '../enums/subscription.enum';

export class Subscription {
  @prop({ type: String, enum: SubscriptionTypesEnum })
  type: string;

  @prop({ type: String, enum: UserTypesEnum })
  userType: string;

  @prop({ type: Number })
  priceMonthly: number;

  @prop({ type: Number })
  priceAnnualy: number;

  @prop({ type: String })
  messagesMonthly: string;

  @prop({ type: String })
  inMailSMSMonthly: string;

  @prop({ type: Number })
  storage: number;

  @prop({ type: String })
  sharing: string;

  @prop({ type: String })
  outboundPatientSharing: string;

  @prop({ type: String })
  viewSharedPatients: string;

  @prop({ type: String })
  pollFeatureMonthly: string;

  @prop({ type: String })
  messageRetentionAndDeletion: string;

  @prop({ type: String })
  umedmiBotResponses: string;

  @prop({ type: String })
  callVideoFeature: string;

  @prop({ type: String })
  autoScheduler: string;

  @prop({ type: String })
  ADSBlocker: string;

  @prop({ type: String })
  templates: string;

  @prop({ type: String })
  clinicSheetBuilder: string;

  @prop({ type: String })
  dashboard: string;

  @prop({ type: String })
  printing: string;

  @prop({ type: String })
  voiceNotesAndUploads: string;

  @prop({ type: String })
  voiceRecognition: string;

  @prop({ type: String })
  handwritingRecognition: string;

  @prop({ type: String })
  extractForms: string;

  @prop({ type: Boolean, default: true })
  isActive: boolean;
}
