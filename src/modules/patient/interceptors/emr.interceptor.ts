import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IPatientRequest } from '../interfaces/i-patient-request.interface';
import { IPatientResponse } from '../interfaces/i-patient-response.interface';
import { PatientService } from '../patient.service';
@Injectable()
export class EmrInterceptor implements NestInterceptor<IPatientRequest, Partial<IPatientResponse>> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map(patient => ({
        ...patient,
        // EMR: PatientService.emr(patient),
      })),
    );
  }
}
