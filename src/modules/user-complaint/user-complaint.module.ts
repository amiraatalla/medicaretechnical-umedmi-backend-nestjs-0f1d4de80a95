import { Module } from '@nestjs/common';
import { UserComplaintService } from './user-complaint.service';
import { UserComplaintRepository } from './repositories/user-complaint.repository';
import { TypegooseModule } from 'nestjs-typegoose';
import { UserComplaint } from './models/user-complaint.model';

@Module({
  imports: [TypegooseModule.forFeature([UserComplaint])],
  providers: [UserComplaintService, UserComplaintRepository, UserComplaint],
  exports: [UserComplaintService],
})
export class UserComplaintModule {}
