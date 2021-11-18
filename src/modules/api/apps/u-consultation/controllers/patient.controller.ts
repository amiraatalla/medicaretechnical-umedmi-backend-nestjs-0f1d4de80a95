import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';
import { ApiBearerAuth, ApiCreatedResponse, ApiResponse, ApiTags } from '@nestjs/swagger';
import { identity } from 'rxjs';
import { Auth } from '../../../../auth/models/auth';
import { PatientResponseDto } from '../../../../patient/dtos/patient-response.dto';
import { PatientPersonalInfoDto } from '../../../../patient/dtos/patient-personal-info.dto';
import { EmrInterceptor } from '../../../../patient/interceptors/emr.interceptor';
import { Patient } from '../../../../patient/models/patient';
import { PatientService } from '../../../../patient/patient.service';
import { LoggedInUser } from '../../../decorators/logged-in-user.decorator';
import { AppsEnum } from '../../../enums/apps.enum';
import { JwtAuthGuard } from '../../../guards/jwt-auth.guard';
import { createPrefix } from '../../../helpers/prefix.helper';
import { Unique } from '../../../validators/unique-mongo.validator';
import { ApproveRequestPatientDto } from '../../../../patient/dtos/approve-request-patient.dto';
import { PaginationDto } from '../../../../shared/dtos/pagination.dto';
import { PatientAccessRequestDto } from '../../../../patient/dtos/request-access.dto';
import { PatientPermessionStatusEnum } from '../../../../patient/enums/patient-parmession-status.enum';
import { PatientDto } from '../../../../patient/dtos/patient.dto';
import { PaginatePatientDto } from '../../../../patient/dtos/paginate-patient.dto';
import { UpdatePatientDto } from '../../../../patient/dtos/update-patient.dto';
import { Roles } from '../../../decorators/roles.decorator';
import { AuthRolesEnum } from '../../../../auth/enums/auth-roles.enum';
import { DocumentUploadDto } from '../../../../patient/dtos/document-upload.dto';
import { HashtagDto } from 'src/modules/patient/dtos/hashtag.dto';
import { PatientResponse } from 'src/modules/shared/responses/patient.response.dto';
import { LinkDto } from 'src/modules/patient/dtos/link.dto';
import { ShareDto } from 'src/modules/patient/dtos/share-address.dto';
import { CBCDto } from 'src/modules/patient/dtos/cbc.dto';
import { DocumentInfoDto } from 'src/modules/patient/dtos/document.dto';

@ApiTags('Patient')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller(createPrefix(AppsEnum.U_CONSULTATION, 'patient'))
export class PatientController {
  constructor(private _service: PatientService) {}

  @Get('preview')
  async preview(@Query() pagination: PaginationDto) {
    return this._service.preview({}, { page: pagination.page, limit: pagination.limit });
  }
  @Post('')
  async add(@Body() patientDto: PatientPersonalInfoDto, @LoggedInUser() user: Auth): Promise<PatientDto> {
    return <PatientDto>(<unknown>await this._service.add(patientDto, user.id));
  }
  @Put(':patientId')
  async update(
    @Param('patientId') patientId: string,
    @Body() patientDto: UpdatePatientDto,
    @LoggedInUser() user: Auth,
  ): Promise<PatientDto> {
    return <PatientDto>(<unknown>await this._service.update(patientId, patientDto, user.id));
  }
  @Get('my-patients')
  async getMyPatients(@LoggedInUser() user: Auth, @Query() pagination: PaginationDto) {
    return this._service.getUserPatients(user.id, {}, { page: pagination.page, limit: pagination.limit });
  }
  /**
   * Request Status: Pending, Approved, Rejected
   * @example Pending
   * @example Approved
   * @example Rejected
   */
  @Get('/patients-requested-by-me')
  async getUserRequestedPatiens(@LoggedInUser() user: Auth, @Query() pagination: PaginatePatientDto) {
    return this._service.getUserRequestedPatients(
      user.id,
      {},
      { page: pagination.page, limit: pagination.limit },
      pagination.status,
    );
  }
  @Get('/requests-to-me')
  async getRequestsToUser(
    @LoggedInUser() user: Auth,
    @Query() pagination: PaginatePatientDto,
    // @Param('status') status: PatientPermessionStatusEnum,
  ) {
    return this._service.getRequestsToUser(user.id, pagination, pagination.status);
  }
  @Get(':id')
  async getPatient(@Param('id') patientId: string, @LoggedInUser() user: Auth) {
    return this._service.getSinglePatient(user.id, patientId);
  }
  @Get('/sn/:sn')
  async getPatientBySN(@Param('sn') patientSN: string, @LoggedInUser() user: Auth) {
    return this._service.getSinglePatientBySN(user.id, patientSN);
  }
  @Put('/request-access/:patientId')
  async requestAccess(
    @Param('patientId') patientId: string,
    @LoggedInUser() user: Auth,
    @Body() patientAccessRequestDto: PatientAccessRequestDto,
  ) {
    return this._service.requestAccess(user.id, patientId, patientAccessRequestDto);
  }
  @Put('/approve-access-request/:patientId')
  async approveAccesss(
    @Param('patientId') patientId: string,
    @LoggedInUser() user: Auth,
    @Body() requestDto: ApproveRequestPatientDto,
  ) {
    const patient = await this._service.getSinglePatient(user.id, patientId);
    if (patient) return this._service.approveRequest(patientId, requestDto.requestUserId);
  }
  @Put('/reject-access-request/:patientId')
  async preventAccesss(
    @Param('patientId') patientId: string,
    @LoggedInUser() user: Auth,
    @Body() requestDto: ApproveRequestPatientDto,
  ) {
    const patient = await this._service.getSinglePatient(user.id, patientId);
    if (patient) return this._service.preventUser(patientId, requestDto.requestUserId);
  }
  @ApiBearerAuth()
  @Delete(':patientId')
  async remove(@Param('patientId') patientId: string, @LoggedInUser() auth: Auth) {
    return await this._service.delete(auth.id, patientId, auth.role);
  }
  @Post('hashdocument')
  async createDocument(@Body() hashdto: HashtagDto): Promise<PatientResponse> {
    const data = await this._service.createDocument({ ...hashdto });
    return new PatientResponse(data);
  }
  @UseInterceptors(FileInterceptor('file'))
  @Post('file')
  async uploadFile(@Body() body: DocumentUploadDto, @UploadedFile() file: Express.Multer.File) {
    return {
      body,
      file: file.buffer.toString(),
    };
  }
  @Post('addlink')
  async AddLink(@Body() linkdto: LinkDto): Promise<PatientResponse> {
    const data = await this._service.AddLink({ ...linkdto });
    return new PatientResponse(data);
  }

  @Post('sharedocument')
  async ShareWith(@Body() sharedto: ShareDto): Promise<PatientResponse> {
    const data = await this._service.ShareWith({ ...sharedto });
    return new PatientResponse(data);
  }
  @Post('addCbc')
  async AddCBC(@Body() cbcdto: CBCDto): Promise<PatientResponse> {
    const data = await this._service.AddCBC({ ...cbcdto });
    return new PatientResponse(data);
  }

  @Post('addDocument')
  addDocument(@Body() document: DocumentInfoDto, @LoggedInUser() user: Auth) {
    return this._service.addDocument({ ...document, createdBy: user.id });
  }
  @Get()
  async findAll(@Query() documentInfoDto: DocumentInfoDto) {
    const { ...filter } = documentInfoDto;
    return await this._service.getAllDocument(filter);
  }
}
