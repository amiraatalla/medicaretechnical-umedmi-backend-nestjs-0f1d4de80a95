import { Business } from '../models/business';
import { Injectable } from '@nestjs/common';
import { BusinessDto } from '../dtos/business.dto';
import { BusinessRepository } from '../repositories/business.repository';
import { AuthRepository } from 'src/modules/auth/repositories/auth.repository';
import { Types } from 'mongoose';
import { UploaderService } from '../../utils/uploader/uploader.service';
import { DeleteImageFieldDto } from '../dtos/delete-image-field.dto';

@Injectable()
export class BusinessService {
  constructor(
    private repo: BusinessRepository,
    private readonly _uploaderService: UploaderService,
    private authRepo: AuthRepository,
  ) {}

  cleanRequest(businessObject) {
    if (businessObject.location)
      businessObject.residence = {
        mapLocation: { coordinates: [businessObject.location.lat, businessObject.location.lng] },
        countryId: businessObject.country,
        cityId: businessObject.city,
      };
    if (businessObject.personalMedicalFacilityName)
      businessObject.numberOfBranches = businessObject.personalMedicalFacilityName.branchNumber;

    if (businessObject.personalMedicalFacilityBranch)
      businessObject.personalMedicalFacilityBranch = businessObject.personalMedicalFacilityBranch.map(object => {
        object.branchLocation = {
          cityId: object.city,
          countryId: object.country,
        };
        if (object.location)
          object.branchLocation.mapLocation = {
            type: object.type,
            coordinates: [object.location.lat, object.location.lng],
          };
        object.name = { ar: object.arabicBranchName, en: object.branchName };
        object.phone = { phoneType: object.phoneType, phoneNumber: object.phoneNumber };
        return object;
      });
    if (businessObject.personalMedicalFacilityBranch)
      businessObject.personalMedicalFacilityBranch = businessObject.personalMedicalFacilityBranch.map(object => {
        if (businessObject.location)
          object.branchLocation = {
            mapLocation: { coordinates: [businessObject.location.lat, businessObject.location.lng] },
          };
        else object.branchLocation = {};
        object.branchLocation.countryId = object.country;
        object.branchLocation.cityId = object.city;
        object.name = { ar: object.arabicBranchName, en: object.branchName };
        object.phone = { phoneType: object.phoneType, phoneNumber: object.phoneNumber };
        return object;
      });
    if (businessObject.personnelLicensure)
      businessObject.personnelLicensure = businessObject.personnelLicensure.map(object => {
        object.name = { firstName: object.firstName, middleName: object.middleName, lastName: object.lastName };
        object.fullName = { ar: object.arabicFullName };
        object.phone = { phoneType: object.phoneType, phoneNumber: object.phoneNumber };

        object.residence = {
          cityId: object.city,
          countryId: object.country,
        };
        if (object.location)
          object.residence.mapLocation = { type: object.type, coordinates: [object.location.lat, object.location.lng] };

        return object;
      });

    businessObject.professionalExperience = businessObject.professionalExperience
      ? businessObject.professionalExperience.map(object => {
          object.residence = {
            cityId: object.city,
            countryId: object.country,
          };
          if (object.location)
            object.residence.mapLocation = {
              type: object.type,
              coordinates: [object.location.lat, object.location.lng],
            };

          return object;
        })
      : null;
    if (businessObject.location)
      businessObject.residence = {
        mapLocation: { coordinates: [businessObject.location.lat, businessObject.location.lng] },
      };
    else businessObject.residence = {};
    businessObject.residence.countryId = businessObject.country;
    businessObject.residence.cityId = businessObject.city;
    // businessObject.name = businessObject.fullName;
    // businessObject.fullName = { ar: businessObject.arabicFullName };
    if (businessObject.personalMedicalFacilityName)
      businessObject.numberOfBranches = businessObject.personalMedicalFacilityName.branchNumber;

    if (businessObject.personnelLicensure)
      businessObject.personnelLicensure = businessObject.personnelLicensure.map(object => {
        object.name = { firstName: object.firstName, middleName: object.middleName, lastName: object.lastName };
        object.fullName = { ar: object.arabicPersonnelName };
        object.phone = { phoneType: object.phoneType, phoneNumber: object.phoneNumber };
        if (object.location)
          object.residence = {
            mapLocation: { type: object.type, coordinates: [object.location.lat, object.location.lng] },
          };
        else object.residence = {};
        object.residence.countryId = businessObject.country;
        object.residence.cityId = businessObject.city;
        return object;
      });

    if (businessObject.professionalExperience)
      businessObject.professionalExperience = businessObject.professionalExperience.map(object => {
        if (object.location)
          object.residence = {
            mapLocation: { type: object.type, coordinates: [object.location.lat, object.location.lng] },
          };
        else object.residence = {};
        object.residence.countryId = businessObject.country;
        object.residence.cityId = businessObject.city;
        return object;
      });

    return businessObject;
  }
  async cleanResponse(businessObject) {
    businessObject.city = businessObject.residence.cityId;
    businessObject.country = businessObject.residence.countryId;
    businessObject.arabicFullName = businessObject.fullName.ar;
    // businessObject.fullName = businessObject.name;
    if (businessObject.residence.mapLocation) {
      businessObject.type = businessObject.residence.mapLocation.type;
      businessObject.location = {
        lat: businessObject.residence.mapLocation.coordinates[0],
        lng: businessObject.residence.mapLocation.coordinates[1],
      };
    }
    delete businessObject.residence;
    // delete businessObject.name;

    if (businessObject.personalMedicalFacilityBranch)
      businessObject.personalMedicalFacilityBranch = businessObject.personalMedicalFacilityBranch.map(object => {
        object.city = object.branchLocation.cityId;
        object.country = object.branchLocation.countryId;
        if (object.branchLocation.mapLocation) {
          object.type = object.branchLocation.mapLocation.type;
          object.location = {
            lat: object.branchLocation.mapLocation.coordinates[0],
            lng: object.branchLocation.mapLocation.coordinates[1],
          };
        }
        object.arabicBranchName = object.name.ar;
        object.branchName = object.name.en;
        object.phoneType = object.phone.phoneType;
        object.phoneNumber = object.phone.phoneNumber;
        delete object.branchLocation;
        delete object.name;
        delete object.phone;
        return object;
      });

    if (businessObject.personnelLicensure)
      businessObject.personnelLicensure = businessObject.personnelLicensure.map(object => {
        if (object.name) {
          object.firstName = object.name ? object.name.firstName : '';
          object.middleName = object.name.middleName;
          object.lastName = object.name.lastName;
        }

        if (object.fullName) object.arabicPersonnelName = object.fullName.ar;
        object.phoneType = object.phone.phoneType;
        object.phoneNumber = object.phone.phoneNumber;
        object.city = object.residence.cityId;
        object.country = object.residence.countryId;
        if (object.residence.mapLocation) {
          object.type = object.residence.mapLocation.type;
          object.location = {
            lat: object.residence.mapLocation.coordinates[0],
            lng: object.residence.mapLocation.coordinates[1],
          };
        }
        delete object.residence;
        delete object.name;
        delete object.fullName;
        delete object.phone;
        return object;
      });

    if (businessObject.professionalExperience)
      businessObject.professionalExperience = businessObject.professionalExperience.map(object => {
        object.city = object.residence.cityId;
        object.country = object.residence.countryId;
        if (object.residence.mapLocation) {
          object.type = object.residence.mapLocation.type;
          object.location = {
            lat: object.residence.mapLocation.coordinates[0],
            lng: object.residence.mapLocation.coordinates[1],
          };
        }
        delete object.residence;
        return object;
      });
    return businessObject;
  }
  async execute(request, userId: string): Promise<Business> {
    const business = await this.repo.findOne({ userId: userId });
    if (business) return await this.repo.findByIdAndUpdate(String(business.id), request);
    const businessId = await this.repo.save({ ...request });
    await this.authRepo.findByIdAndUpdate(userId, { $set: { businessId: businessId } });
  }
  async isSubmitted(userId: string): Promise<boolean | null> {
    const business = await this.repo.findOne({ userId: userId });
    if (business) return business.isSubmitted;
    return null;
  }
  async get(userId: string): Promise<Business | null> {
    const business = await this.repo.findOne({ userId: userId });
    if (business) return business;
    return null;
  }
  async deleteImageField(userid: string, deleteImageFieldDto: DeleteImageFieldDto) {
    const { imageName, imageFieldPath, fromArray = false } = deleteImageFieldDto;
    let response: any;
    // const deleteImageResponse =  await this._uploaderService.deleteImage(deleteImageFieldDto.imageName);
    // if (deleteImageFieldDto.deleteImage) {
    //
    // }
    return {
      buisneseUpdateRespone: await this.repo.findOneAndUpdate(
        { userId: userid, [imageFieldPath]: imageName },
        fromArray
          ? {
              $pull: {
                [imageFieldPath.replace('.', '.$.')]: imageName,
              },
            }
          : {
              $set: {
                imageFieldPath: null,
              },
            },
      ),
      deleteImageResponse: deleteImageFieldDto.deleteImage
        ? await this._uploaderService.deleteImage(deleteImageFieldDto.imageName)
        : null,
    };
  }
}
