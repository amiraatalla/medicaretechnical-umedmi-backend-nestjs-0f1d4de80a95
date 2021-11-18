import { IsOptional, IsString } from 'class-validator';

export class ReviewBusinessCommentDto {
  @IsString()
  @IsOptional()
  bio: string;

  @IsString()
  @IsOptional()
  information: string;

  @IsString()
  @IsOptional()
  education: string;

  @IsString()
  @IsOptional()
  licensure: string;

  @IsString()
  @IsOptional()
  experience: string;
}
