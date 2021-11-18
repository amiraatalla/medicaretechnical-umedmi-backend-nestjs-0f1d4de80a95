import { Type } from 'class-transformer';
import { IsString, IsNotEmpty, IsEnum, IsObject, ValidateNested } from 'class-validator';
import { ApprovalTypesEnum } from 'src/modules/business/enums/business.enum';
import { ReviewBusinessCommentDto } from './review-buiseness-comment.dto';

export class ReviewBusinessDto {
  @IsString()
  @IsNotEmpty()
  @IsEnum(ApprovalTypesEnum)
  isApproved: ApprovalTypesEnum;

  @ValidateNested({})
  @Type(() => ReviewBusinessCommentDto)
  comments: ReviewBusinessCommentDto;
}
