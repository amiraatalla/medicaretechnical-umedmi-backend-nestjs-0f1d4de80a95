import { Module, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import admin from 'firebase-admin';
import { RealtimeDatabaseService } from './realtime-database/realtime-database.service';
import { FCM_CONFIG } from './fcm/config/_fcm.config';

@Module({
  imports: [ConfigService],
  providers: [ConfigService, RealtimeDatabaseService],
  exports: [RealtimeDatabaseService],
})
export class FirebaseModule implements OnModuleInit {
  constructor(private configService: ConfigService) {}

  onModuleInit(): any {
    admin.initializeApp({
      credential: admin.credential.cert(FCM_CONFIG),
      databaseURL: this.configService.get('FIREBASE_DATABASE_URL'),
    });
  }
}
