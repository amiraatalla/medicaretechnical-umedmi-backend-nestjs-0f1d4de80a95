import { FcmMessage } from './interfaces/fcm-message.interface';
import { logger } from '@typegoose/typegoose/lib/logSettings';
import admin from 'firebase-admin';

export class FcmService {
  private fcm;
  private static instance: FcmService;
  private constructor() {
    this.fcm = admin;
  }
  public static getInstance(): FcmService {
    if (!FcmService.instance) {
      FcmService.instance = new FcmService();
    }
    return FcmService.instance;
  }
  async send(message: FcmMessage): Promise<string> {
    try {
      return await this.fcm.messaging().send(message);
    } catch (error) {
      logger.log(error);
    }
  }
  async subscribeToTopic(tokens: string[], topicName: string): Promise<string> {
    try {
      return await this.fcm.messaging().subscribeToTopic(tokens, topicName);
    } catch (error) {
      logger.log(error);
    }
  }
  async unsubscribeToTopic(tokens: string[], topicName: string): Promise<string> {
    try {
      return await this.fcm.messaging().unsubscribeToTopic(tokens, topicName);
    } catch (error) {
      logger.log(error);
    }
  }
}
