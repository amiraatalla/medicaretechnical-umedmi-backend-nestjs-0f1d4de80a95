import { ModelRepository } from 'src/modules/shared/decorators/model-repository';
import { BaseRepository } from 'src/modules/shared/repositories/base-repository';
import { CommonDiagnosis } from '../models/common-diagnosis.entity';

@ModelRepository(CommonDiagnosis)
export class CommonDiagnosisRepository extends BaseRepository<CommonDiagnosis> {}
