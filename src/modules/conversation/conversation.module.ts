import { Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';
import { Conversation } from './models/conversation';
import { Message } from './models/message';
import { Auth } from '../auth/models/auth';

import { ConversationService } from './services/conversation.service';
import { ConversationRepository } from './repositories/conversation.repository';
import { MessageRepository } from './repositories/message.repository';
import { AuthRepository } from '../auth/repositories/auth.repository';
import { BusinessRepository } from '../business/repositories/business.repository';
import { Business } from '../business/models/business';
import { Schedule } from './models/schedule';
import { ScheduleRepository } from './repositories/schedule.repository';
import { NotificationService } from '../utils/notification/notification.service';
import { RealtimeConversationRepository } from './repositories/realtime-conversation.repository';
import { FirebaseModule } from '../utils/firebase/firebase.module';

@Module({
  imports: [TypegooseModule.forFeature([Conversation, Message, Auth, Business, Schedule]), FirebaseModule],
  providers: [
    ConversationService,
    MessageRepository,
    BusinessRepository,
    ConversationRepository,
    AuthRepository,
    ScheduleRepository,
    NotificationService,
    RealtimeConversationRepository,
  ],
  exports: [ConversationService],
})
export class ConversationModule {}
