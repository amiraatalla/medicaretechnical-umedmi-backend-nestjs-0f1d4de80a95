import { Module } from '@nestjs/common';
import { UserSuggestService } from './user-suggest.service';
import { UserSuggestRepository } from './repositories/user-suggest.repository';
import { TypegooseModule } from 'nestjs-typegoose';
import { UserSuggest } from './models/user-suggest.model';

@Module({
  imports: [TypegooseModule.forFeature([UserSuggest])],
  providers: [UserSuggestService, UserSuggestRepository, UserSuggest],
  exports: [UserSuggestService],
})
export class UserSuggestModule {}
