import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, isNotEmpty, IsString } from 'class-validator';

export interface IFcmMessageNotification {
  title: string;
  body: string;
}
export class FcmMessageNotification implements IFcmMessageNotification {
  @ApiProperty({ type: String })
  @IsString()
  title: string;
  @ApiProperty({ type: String })
  @IsString()
  body: string;
}
