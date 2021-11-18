import { HttpService, Injectable, ServiceUnavailableException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { map } from 'rxjs/operators';
import { AI_URLS_KEYS } from './ai-urls.enum';
import { FileWithKey } from './interfaces/file-with-key.interface';
var FormData = require('form-data');

@Injectable()
export class AiService {
  constructor(private readonly config: ConfigService, private httpService: HttpService) {}
  forwardFile(fileWithKey: FileWithKey, apiUrlKey: AI_URLS_KEYS) {
    const formData = new FormData();
    formData.append(fileWithKey.key, fileWithKey.file.buffer, { filename: fileWithKey.file.originalname });
    const headers = {
      ...formData.getHeaders(),
      'Content-Length': formData.getLengthSync(),
      'Access-Control-Allow-Origin': '*',
    };
    try {
      return this.httpService
        .post(this.config.get(apiUrlKey), formData, { headers })
        .pipe(map(response => response.data));
    } catch (error) {
      throw new ServiceUnavailableException({ message: 'Api Error', error: JSON.stringify(error) });
    }
  }
  forwardFiles(filesWithKeys: FileWithKey[], apiUrlKey: AI_URLS_KEYS) {
    const formData = new FormData();
    filesWithKeys.forEach(filesWithKey => {
      formData.append(filesWithKey.key, filesWithKey.file.buffer, { filename: filesWithKey.file.originalname });
    });

    const headers = {
      ...formData.getHeaders(),
      'Content-Length': formData.getLengthSync(),
      'Access-Control-Allow-Origin': '*',
    };
    try {
      return this.httpService
        .post(this.config.get(apiUrlKey), formData, { headers })
        .pipe(map(response => response.data));
    } catch (error) {
      throw new ServiceUnavailableException({ message: 'Api Error', error: JSON.stringify(error) });
    }
  }
  forwardForm(obj: any, apiUrlKey: AI_URLS_KEYS) {
    const formData = new FormData();
    for (const [key, value] of Object.entries(obj)) {
      formData.append(key, value);
    }
    const headers = {
      ...formData.getHeaders(),
      'Content-Length': formData.getLengthSync(),
      'Access-Control-Allow-Origin': '*',
    };
    try {
      return this.httpService
        .post(this.config.get(apiUrlKey), formData, { headers })
        .pipe(map(response => response.data));
    } catch (error) {
      throw new ServiceUnavailableException({ message: 'Api Error', error: JSON.stringify(error) });
    }
  }
}
