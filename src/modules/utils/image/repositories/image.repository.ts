import { BaseRepository } from '../../../shared/repositories/base-repository';
import { Image } from '../models/image.model';
import { ModelRepository } from '../../../shared/decorators/model-repository';

@ModelRepository(Image)
export class ImageRepository extends BaseRepository<Image> {}
