import {
  Controller,
  Get,
  Post,
  UseGuards,
  Body,
  Param,
  NotFoundException,
  ForbiddenException,
  Put,
  UnauthorizedException,
  Query,
} from '@nestjs/common';
import { createPrefix } from '../../../../helpers/prefix.helper';
import { AppsEnum } from '../../../../enums/apps.enum';
import { SubscriptionService } from 'src/modules/subscription/services/subscription.service';
import {
  SubscriptionResponse,
  SubscriptionArrayResponse,
  SendInvitationResponse,
  VerifyCodeResponse,
  UpdatePaymentImageResponse,
  SubscriptionDateResponse,
} from 'src/modules/shared/responses/subscription.response.dto';
import { JwtAuthGuard } from 'src/modules/api/guards/jwt-auth.guard';
import { LoggedInUser } from 'src/modules/api/decorators/logged-in-user.decorator';
import { Auth } from 'src/modules/auth/models/auth';
import { UpdatePaymentImageDto } from 'src/modules/subscription/dtos/update-payment-image.dto';
import { SendInvitationRequest } from 'src/modules/shared/requests/send-invitation.request';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ListUsersResponse } from 'src/modules/shared/responses/list-users.response.dto';
import { ReviewSubscriptionRequest } from 'src/modules/shared/requests/review-subscription.request';
import { UserResponse } from 'src/modules/shared/responses/user.response.dto';
import { AuthRolesEnum } from '../../../../../auth/enums/auth-roles.enum';
import { Roles } from '../../../../decorators/roles.decorator';
import { SubscriptionFilterDto } from '../../../../../shared/requests/subscription-filter.dto';
import { filter } from 'rxjs/operators';
import { RolesGuard } from '../../../../guards/roles.guard';

@ApiTags('Subscribe')
@Controller(createPrefix(AppsEnum.U_CONSULTATION, 'subscribe'))
@ApiBearerAuth()
export class SubscriptionController {
  constructor(private subscriptionService: SubscriptionService) {}

  @Get()
  async findAll(@Query() subscriptionFilter: SubscriptionFilterDto) {
    const { page, limit, ...filter } = subscriptionFilter;
    return await this.subscriptionService.getAll(filter, { page, limit });
  }

  @Get('/indiv')
  async findAllIndiv(): Promise<SubscriptionArrayResponse> {
    const subscriptions = await this.subscriptionService.getIndiv();
    return new SubscriptionArrayResponse(subscriptions);
  }

  @Get('/corp')
  async findAllCorp(): Promise<SubscriptionArrayResponse> {
    const subscriptions = await this.subscriptionService.getCorp();
    return new SubscriptionArrayResponse(subscriptions);
  }

  @UseGuards(JwtAuthGuard)
  @Post('send-invitation')
  async sendInvitation(
    @Body() body: SendInvitationRequest,
    @LoggedInUser() user: Auth,
  ): Promise<SendInvitationResponse> {
    const sent = await this.subscriptionService.sendInvitation(body, user);
    if (sent) return new SendInvitationResponse(body.emails[0].email);
    throw new ForbiddenException('Forbidden', 'Sent Invitations exceeded 10');
  }

  @UseGuards(JwtAuthGuard)
  @Post('verify-code')
  async verifyCode(@LoggedInUser() user: Auth, @Body() body): Promise<VerifyCodeResponse> {
    await this.subscriptionService.verifyCode(body.code, user);
    return new VerifyCodeResponse('Code Verified');
  }
  @UseGuards(JwtAuthGuard)
  @Post('payment-image')
  async updatePaymentImage(
    @LoggedInUser() user: Auth,
    @Body() body: UpdatePaymentImageDto,
  ): Promise<UpdatePaymentImageResponse> {
    await this.subscriptionService.updatePaymentImage(body.paymentImage, user);
    return new UpdatePaymentImageResponse();
  }
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async create(@LoggedInUser() user: Auth, @Param('id') id: string): Promise<SubscriptionDateResponse> {
    const subscribedUser = await this.subscriptionService.subscribe(id, user);
    return new SubscriptionDateResponse(subscribedUser.currentPackageStartingDate);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(AuthRolesEnum.SuperAdmin)
  @Put(':id')
  async edit(@LoggedInUser() user: Auth, @Param('id') id: string, @Body() body): Promise<SubscriptionResponse> {
    const subscription = await this.subscriptionService.edit(id, body);
    return new SubscriptionResponse(subscription);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(AuthRolesEnum.SuperAdmin)
  @Put('activate/:id')
  async activate(@LoggedInUser() user: Auth, @Param('id') id: string): Promise<SubscriptionResponse> {
    const subscription = await this.subscriptionService.activate(id);
    return new SubscriptionResponse(subscription);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(AuthRolesEnum.SuperAdmin)
  @Put('deactivate/:id')
  async deactivate(@LoggedInUser() user: Auth, @Param('id') id: string): Promise<SubscriptionResponse> {
    const subscription = await this.subscriptionService.deactivate(id);
    return new SubscriptionResponse(subscription);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(AuthRolesEnum.SuperAdmin)
  @Get('list/requests')
  async listRequest(@LoggedInUser() user: Auth): Promise<ListUsersResponse> {
    const requests = await this.subscriptionService.listSubscriptionRequest();
    return new ListUsersResponse(requests);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(AuthRolesEnum.SuperAdmin)
  @Post('review/request/:userId')
  async reviewRequest(
    @LoggedInUser() user: Auth,
    @Param('userId') userId: string,
    @Body() body: ReviewSubscriptionRequest,
  ): Promise<UserResponse> {
    const reviewedUser = await this.subscriptionService.reviewSubscription(userId, body);
    return new UserResponse(reviewedUser);
  }
}
