import { Auth } from '../models/auth';

export class SerializerService {
  static serialize(auth: Auth) {
    return {
      id: auth.id,
      businessId: auth.businessId,
      email: auth.email,
      phoneNumber: auth.phoneNumber,
      role: auth.role,
      language: auth.language,
      isVerified: auth.isVerified,
      isPhoneVerified: auth.isPhoneVerified,
      currentPackageId: auth.currentPackageId,
      currentPackageStartingDate: auth.currentPackageStartingDate,
      currentPackageEndDate: auth.currentPackageEndDate,
      invitationCode: auth.invitationCode,
      sentInvitationsCount: auth.sentInvitationsCount,
      sentInvitationsCountLimited: auth.sentInvitationsCountLimited,
      hasAppliedInviationCode: auth.hasAppliedInviationCode,
      appliedInviationCode: auth.appliedInviationCode,
    };
  }
}
