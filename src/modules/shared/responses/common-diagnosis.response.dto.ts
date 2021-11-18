import { BaseHttpResponse } from '../classes/base-http.response';
import { CommonDiagnosis } from 'src/modules/common-diagnosis/models/common-diagnosis.entity';
import { PaginationDto } from '../dtos/pagination.dto';
import { PaginatedResponseDto } from '../dtos/paginated-response.dto';
export class CommonDiagnosisResponse extends BaseHttpResponse<CommonDiagnosis> {
  data: CommonDiagnosis;
  constructor(commondiagnosis: CommonDiagnosis) {
    super();
    this.data = commondiagnosis;
  }
}

export class CommonDiagnosisArrayResponse extends BaseHttpResponse<Array<CommonDiagnosis>> {
  data: Array<CommonDiagnosis>;

  constructor(commondiagnosisArray: Array<CommonDiagnosis>) {
    super();
    this.data = commondiagnosisArray;
  }
}

export class CommonDiagnosisPaginatedResponse extends PaginatedResponseDto {
  docs: CommonDiagnosis[];
}
