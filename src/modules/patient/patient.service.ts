import { string } from '@hapi/joi';
import {
  BadRequestException,
  Body,
  ConflictException,
  ForbiddenException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
  Post,
  ServiceUnavailableException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { PaginateResult, PaginateModel, FilterQuery, QueryPopulateOptions } from 'mongoose';
import { Types, PaginateOptions } from 'mongoose';
import { PatientPersonalInfoDto } from './dtos/patient-personal-info.dto';
import { PatientAccessRequestDto } from './dtos/request-access.dto';
import { PatientPermessionStatusEnum } from './enums/patient-parmession-status.enum';
import { IPatientResponse } from './interfaces/i-patient-response.interface';
import { HashtagModel, Patient, PatientPersonalInfoModel } from './models/patient';
import { PatientRepository } from './repositories/patient.repository';
import { DocumentType, ModelType } from '@typegoose/typegoose/lib/types';
import { access } from 'fs';
import { throttle } from 'rxjs/operators';
import { RequestsToUserPipeline } from './pipelines/requests-to-user.pipeline';
import { UpdatePatientDto } from './dtos/update-patient.dto';
import { NotificationService } from '../utils/notification/notification.service';
import { AuthRolesEnum } from '../auth/enums/auth-roles.enum';
import { HashtagDto } from '../patient/dtos/hashtag.dto';
import { LinkDto } from './dtos/link.dto';
import { ShareDto } from './dtos/share-address.dto';
import { CBCDto } from './dtos/cbc.dto';
import { DocumentInfoDto } from './dtos/document.dto';
@Injectable()
export class PatientService {
  constructor(private readonly _repo: PatientRepository, private readonly notifier: NotificationService) {}
  private SN(): string {
    return (Date.now() + Math.floor(Math.random() * 10000000)).toString();
  }
  static getRandomChar() {
    const alphabet = 'abcdefghijklmnopqrstuvwxyz';
    return alphabet[Math.floor(Math.random() * alphabet.length)];
  }
  static getDateCode(date: Date = new Date()): string {
    // let date = new Date();
    return ('0' + (date.getMonth() + 1)).slice(-2) + String(date.getFullYear()).slice(-2);
  }
  private emr(patient: PatientPersonalInfoDto): string {
    const name = patient.fullNameEnglish
      ? patient.fullNameEnglish
      : patient.fullNameArabic
      ? patient.fullNameArabic
      : PatientService.getRandomChar() + ' ' + PatientService.getRandomChar();

    const nameArr = name.split(' ');
    return (
      (nameArr[0] && nameArr[0].length > 0 ? nameArr[0][0] : PatientService.getRandomChar()) +
      (nameArr[1] && nameArr[1].length > 0 ? nameArr[1][0] : PatientService.getRandomChar()) +
      PatientService.getDateCode(new Date()) +
      (patient.ssn ? patient.ssn.substr(patient.ssn.length - 4) : Math.floor(1000 + Math.random() * 9000).toString())
    );
  }
  add(patientDto: PatientPersonalInfoDto, cretedByUserId: string) {
    const patientModel = {
      personalInfo: <PatientPersonalInfoModel>{ ...patientDto },
      SN: this.SN(),
      EMR: this.emr(patientDto),
      createdBy: new Types.ObjectId(cretedByUserId),
    };
    return this._repo.save(patientModel, true);
  }
  async update(patientId: string, patientDto: UpdatePatientDto, cretedByUserId: string) {
    const patientDoc = await this._repo.findOne({ _id: patientId });
    if (!patientDoc) {
      throw new UnprocessableEntityException('patient not found!!');
    }
    if (patientDoc.createdBy != cretedByUserId) {
      throw new ForbiddenException("User didn't create this patient");
    }
    if (
      patientDto.personalInfo.phoneNumber &&
      patientDto.personalInfo.phoneNumber !== patientDoc.personalInfo.phoneNumber
    ) {
      const found = await this._repo.findOne(
        { 'personalInfo.phoneNumber': patientDto.personalInfo.phoneNumber },
        { 'personalInfo.phoneNumber': 1 },
      );
      if (found) {
        throw new ConflictException({ path: 'phoneNumber', msg: 'Phone number must be unique' });
      }
    }
    if (patientDto.personalInfo.ssn && patientDto.personalInfo.ssn !== patientDoc.personalInfo.ssn) {
      const found = await this._repo.findOne({ 'personalInfo.ssn': patientDto.personalInfo.ssn }, {});
      if (found) {
        throw new ConflictException({ path: 'ssn', msg: 'ssn must be unique' });
      }
    }
    const patientModel = {
      personalInfo: patientDto.personalInfo,
      EMR: this.emr(patientDto.personalInfo),
    };
    try {
      return this._repo.findByIdAndUpdate(patientId, patientModel);
    } catch (error) {
      throw new ServiceUnavailableException(error);
    }
  }
  async getUserPatients(userId, filter: Partial<Patient> = {}, options: PaginateOptions) {
    filter.createdBy = userId;
    options.populate = [
      {
        path: 'accessRequests',
        populate: {
          path: 'requestedBy',
          select: ['_id', 'name', 'username'],
        },
      },
    ];
    return await this._repo.paginate(filter, options);
  }
  async getUserRequestedPatients(
    userId,
    filter: FilterQuery<DocumentType<Patient>> = {},
    options: PaginateOptions,
    status?: PatientPermessionStatusEnum,
  ) {
    filter.accessRequests = {
      $elemMatch: {
        requestedBy: userId,
        ...(status ? { status } : {}),
      },
    };
    options.projection = {
      $arrayFilters: {
        'accessRequests.requestedBy': userId,
      },
    };
    const projectedInfo = { personalInfo: 1, specialities: 1, investigations: 1, referals: 1, reports: 1 };
    options.projection = {
      ...projectedInfo,
      SN: 1,
      'accessRequests.$.requestedBy': userId,
    };
    options.populate = [];

    const paginatedPatients = await this._repo.paginate(filter, options);
    // if (status == PatientPermessionStatusEnum.Approved) {
    paginatedPatients.docs = paginatedPatients.docs.map(doc => {
      return this.getPatientAllowedInfo(doc, doc.accessRequests[0]);
    });
    // }
    return paginatedPatients;
  }
  async getRequestsToUser(userId, options: PaginateOptions, status: PatientPermessionStatusEnum) {
    const pipeline = RequestsToUserPipeline(userId, options.page, options.limit, status);
    return await this._repo.aggregate(pipeline);
  }
  preview(filter: Partial<Patient> = {}, options: PaginateOptions) {
    options.populate = [];
    options.projection = {
      'personalInfo.fullNameArabic': 1,
      'personalInfo.fullNameEnglish': 1,
    };
    return this._repo.paginate(filter, options);
  }
  checkAccess(userId: string, patient: Patient, throwException: boolean = true): boolean | string[] {
    if (userId == patient.createdBy) return true;
    if (!patient) {
      throw new NotFoundException('Not Found');
    }
    const accessRequests: any[] = patient.accessRequests ? JSON.parse(JSON.stringify(patient.accessRequests)) : [];
    const foundAccess = accessRequests.find(
      accessRequest =>
        userId ==
          (typeof accessRequest.requestedBy === 'string' ? <string>accessRequest : accessRequest.requestedBy._id) &&
        accessRequest.status === PatientPermessionStatusEnum.Approved,
    );
    if (!foundAccess) {
      if (throwException) throw new HttpException('Not Allowed', HttpStatus.FORBIDDEN);
      else return false;
    }
    return foundAccess;
  }
  async getSinglePatient(userId: string, patientId: string) {
    const patientDoc = await this._repo.findById(patientId, {}, [
      {
        path: 'accessRequests',
        populate: {
          path: 'requestedBy',
          select: ['_id', 'name', 'username'],
        },
      },
    ]);
    if (!patientDoc) {
      throw new UnprocessableEntityException({ msg: 'patient not found', path: '_id' });
    }
    const access = this.checkAccess(userId, patientDoc);
    return access === false ? {} : access === true ? patientDoc : this.getPatientAllowedInfo(patientDoc, access);
  }
  getPatientAllowedInfo(patientDoc, accessRequest) {
    if (!patientDoc) {
      return false;
    }
    const { _id, createdAt, SN, accessRequests } = patientDoc;
    const res: any = { _id, createdAt, SN, accessRequests };
    if (accessRequest.status == PatientPermessionStatusEnum.Approved) {
      accessRequest.permessions.forEach(permeittedField => (res[permeittedField] = patientDoc[permeittedField]));
    } else {
      const {
        fullNameArabic,
        fullNameEnglish,
        profileImage,
        birthDate,
        genderEnglish,
        age,
        diagnosis,
      } = patientDoc.personalInfo;
      res.personalInfo = { fullNameArabic, fullNameEnglish, profileImage, birthDate, genderEnglish, age, diagnosis };
    }
    return res;
  }
  async getSinglePatientBySN(userId: string, patientSN: string) {
    const patientDoc = await this._repo.findOne({ SN: patientSN }, {}, [
      { path: 'accessRequests', select: ['_id', 'name', 'username'] },
    ]);
    if (!patientDoc) {
      throw new UnprocessableEntityException({ msg: 'Not found', path: 'SN' });
    }
    if (this.checkAccess(userId, patientDoc, false)) return patientDoc;
    else {
      const { fullNameArabic, fullNameEnglish, profileImage } = patientDoc.personalInfo;
      return {
        _id: patientDoc._id,

        personalInfo: { fullNameArabic, fullNameEnglish, profileImage },
      };
    }
  }
  async requestAccess(userId: string, patientId: string, patientAccessRequestDto: PatientAccessRequestDto) {
    const patient = await this._repo.findById(patientId);
    if (!patient) {
      throw new UnprocessableEntityException({ msg: 'patient not found', path: '_id' });
    }
    if (patient.createdBy == userId) {
      throw new UnprocessableEntityException({ msg: "User can't request his patients", path: 'craetedBy' });
    }
    const foundRequest = patient.accessRequests.find(accessRequest => accessRequest.requestedBy == userId);
    if (foundRequest) {
      if (foundRequest.status != PatientPermessionStatusEnum.Rejected) {
        throw new UnprocessableEntityException({
          msg: `request already has status: ${foundRequest.status}`,
          path: 'status',
        });
      }
      foundRequest.status = PatientPermessionStatusEnum.Pending;
      foundRequest.permessions = patientAccessRequestDto.permessions;
    }
    if (!foundRequest) {
      patient.accessRequests.push({
        requestedBy: userId,
        permessions: patientAccessRequestDto.permessions,
        status: PatientPermessionStatusEnum.Pending,
      });
    }
    await this._repo.save(patient, false);
    await this.notifier.notifyUserId(
      {
        notification: {
          title: 'Patient Request Access',
          body: `You have new access request on patient: ${patient.personalInfo.fullNameEnglish}`,
        },
        data: {
          model: 'Patient',
          _id: patientId,
          action: 'accessRequest',
          status: 'Pending',
        },
      },
      patient.createdBy.toString(),
    );
    return true;
  }
  async approveRequest(patientId: string, userIdRequest: string) {
    const patient = await this._repo.findOneAndUpdate(
      { _id: patientId, 'accessRequests.requestedBy': userIdRequest },
      {
        $set: { 'accessRequests.$.status': PatientPermessionStatusEnum.Approved },
      },
    );
    await this.notifier.notifyUserId(
      {
        notification: {
          title: 'Patient Request Access Approved',
          body: `Your request on patient: ${patient.personalInfo.fullNameEnglish} is Approved`,
        },
        data: {
          model: 'Patient',
          _id: patientId,
          action: 'accessRequest',
          status: 'Approved',
        },
      },
      userIdRequest,
    );
    return patient;
  }
  async preventUser(patientId: string, userIdRequest: string) {
    const patient = await this._repo.findOneAndUpdate(
      { _id: patientId, 'accessRequests.requestedBy': userIdRequest },
      {
        $set: { 'accessRequests.$.status': PatientPermessionStatusEnum.Rejected },
      },
    );
    await this.notifier.notifyUserId(
      {
        notification: {
          title: 'Patient Request Access Rejected',
          body: `Your request on patient: ${patient.personalInfo.fullNameEnglish} is rejected`,
        },
        data: {
          model: 'Patient',
          _id: patientId,
          action: 'accessRequest',
          status: 'Rejected',
        },
      },
      userIdRequest,
    );
    return patient;
  }
  async delete(userID: string, patientId: string, role: AuthRolesEnum | string = AuthRolesEnum.CLINIC) {
    const patient = await this._repo.findById(patientId);
    //validate user
    if (!patient) {
      throw new NotFoundException({ patientId: 'NOT_FOUND' });
    }
    if (role !== AuthRolesEnum.SuperAdmin && patient.createdBy != userID) {
      throw new ForbiddenException('Not Patient creator');
    }
    return this._repo.remove({ _id: patientId });
  }

  async createDocument(hashdto: HashtagDto) {
    const HashtagtModell = {
      HashtagInfo: <HashtagModel>{ ...hashdto },
    };
    return await this._repo.save(HashtagtModell, true);
  }

  async AddLink(linkdto: LinkDto) {
    const linkModel = {
      LinkInfo: <LinkDto>{ ...linkdto },
    };
    return await this._repo.save(linkModel, true);
  }

  async ShareWith(sharedto: ShareDto) {
    const shareModel = {
      ShareInfo: <ShareDto>{ ...sharedto },
    };
    return await this._repo.save(shareModel, true);
  }

  async AddCBC(cbcdto: CBCDto) {
    const cbcModel = {
      CBCInfo: <CBCDto>{ ...cbcdto },
    };
    return await this._repo.save(cbcModel, true);
  }
  async addDocument(document: DocumentInfoDto): Promise<Patient> {
    const document_found = this._repo.findOne({ createdBy: document.createdBy }, { _id: 1, id: 1 });
    return await this._repo.save(
      {
        ...document,
        ...(document_found ? { id: (await document_found)._id } : {}),
      },
      !document_found,
    );
  }

  async getAllDocument(filter) {
    return await this._repo.paginate(filter);
  }
}
