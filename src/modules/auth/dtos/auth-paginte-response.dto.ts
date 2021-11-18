import { PaginateResult } from 'mongoose';
import { Auth } from '../models/auth';
export class AuthPaginateResponseDto implements PaginateResult<Auth> {
  [customLabel: string]: number | boolean | Auth[];
  docs: Auth[];
  totalDocs: number;
  limit: number;
  page?: number;
  totalPages: number;
  nextPage?: number;
  prevPage?: number;
  pagingCounter: number;
  hasPrevPage: boolean;
  hasNextPage: boolean;
  meta?: any;
}
