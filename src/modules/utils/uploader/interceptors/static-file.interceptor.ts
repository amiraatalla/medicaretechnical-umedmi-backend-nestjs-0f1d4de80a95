import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IFile } from '../interfaces/file.interface';
import { IFileResponse } from '../interfaces/fileResponse.interface';
import { UploaderService } from '../uploader.service';
@Injectable()
export class StaticFileInterceptor implements NestInterceptor<IFile, IFileResponse> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const [args] = context.getArgs();
    return next.handle().pipe(
      map(file => ({
        ...file,
        route: UploaderService.getFileRoute(file.filename),
        uploadedBy: args.user ? args.user.id : null,
      })),
    );
  }
}
