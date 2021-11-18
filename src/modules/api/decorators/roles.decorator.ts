import { SetMetadata } from '@nestjs/common';
import { AuthRolesEnum } from '../../auth/enums/auth-roles.enum';
export const Roles = (...roles: AuthRolesEnum[]) => SetMetadata('roles', roles);
