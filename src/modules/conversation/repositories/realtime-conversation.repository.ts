import { Injectable } from '@nestjs/common';
import { RealtimeDatabaseService } from '../../utils/firebase/realtime-database/realtime-database.service';
import { Conversation } from '../models/conversation';
import { RealtimeDatabasePathsEnum } from '../enums/realtime-database-paths.enum';

@Injectable()
export class RealtimeConversationRepository {
  constructor(private realtimeDatabaseService: RealtimeDatabaseService) {}

  async createConversation(conversation: Conversation): Promise<boolean> {
    await this.realtimeDatabaseService.update(
      RealtimeDatabasePathsEnum.CONVERSATIONS + `/${conversation._id.toString()}/receiversIds`,
      conversation.activeUsers.map(u => u.userId.toString()),
    );
    return this.realtimeDatabaseService.update(
      RealtimeDatabasePathsEnum.CONVERSATIONS + `/${conversation._id.toString()}`,
      { updatedAt: new Date().getTime() },
    );
  }

  updateLastUpdatedAt(conversationId: string, updatedAt) {
    return this.realtimeDatabaseService.update(RealtimeDatabasePathsEnum.CONVERSATIONS + `/${conversationId}`, {
      updatedAt: updatedAt.getTime(),
    });
  }

  updateReceiversIds(conversationId: string, receiversIds: string[], updatedAt = new Date()) {
    return this.realtimeDatabaseService.update(RealtimeDatabasePathsEnum.CONVERSATIONS + `/${conversationId}`, {
      updatedAt: updatedAt.getTime(),
      receiversIds,
    });
  }
}
