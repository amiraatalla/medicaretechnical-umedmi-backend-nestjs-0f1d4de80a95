import { IsDateString, IsString } from 'class-validator';

export class ScheduleDto {
  @IsString()
  messageId: string;
  @IsDateString()
  date: string;
}
