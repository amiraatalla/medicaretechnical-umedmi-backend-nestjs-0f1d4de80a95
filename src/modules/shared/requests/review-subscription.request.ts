import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class ReviewSubscriptionRequest {
  @IsBoolean()
  @IsNotEmpty()
  isApproved: boolean;

  @IsString()
  @IsOptional()
  comments: string;
}
