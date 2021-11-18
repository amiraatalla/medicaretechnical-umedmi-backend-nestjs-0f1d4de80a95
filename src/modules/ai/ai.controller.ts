import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpService,
  HttpStatus,
  Logger,
  Post,
  Req,
  Request,
  ServiceUnavailableException,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { ApiConsumes, ApiTags } from '@nestjs/swagger';
import { request } from 'express';
import { map } from 'rxjs/operators';
import { ApiFile } from '../shared/decorators/swagger-schema.decorator';
import { AI_URLS_KEYS } from './ai-urls.enum';
import { AiService } from './ai.service';
import { ICD10TextDto } from './dtos/icd10-text.dto';
import { ICD10CodeDto } from './dtos/icd10-code.dto';
import { TranslateDto } from './dtos/translate.dto';
var FormData = require('form-data');
@ApiTags('AI')
@Controller('ai')
export class AiController {
  constructor(private aiService: AiService, private httpService: HttpService, private config: ConfigService) {}
  @Post('dermatology')
  @ApiConsumes('multipart/form-data')
  @ApiFile('file')
  @UseInterceptors(FileInterceptor('file'))
  async dermatology(@UploadedFile() file) {
    return this.aiService.forwardFile({ file: file, key: 'file' }, AI_URLS_KEYS.Dermatology);
  }

  @Post('retinopathy')
  @ApiConsumes('multipart/form-data')
  @ApiFile('file')
  @UseInterceptors(FileInterceptor('file'))
  async retinopathy(@UploadedFile() file) {
    return this.aiService.forwardFile({ file: file, key: 'file' }, AI_URLS_KEYS.Retinopathy);
  }

  @Post('id-scan')
  @ApiConsumes('multipart/form-data')
  @ApiFile('files', { isArray: true })
  @UseInterceptors(FilesInterceptor('files'))
  async idScan(@UploadedFiles() files) {
    return this.aiService.forwardFiles(
      [
        { file: files[0], key: 'Front' },
        { file: files[1], key: 'Back' },
      ],
      AI_URLS_KEYS.ID_Scan,
    );
  }
  @Post('translate-to-en')
  async translateToEn(@Body() data: TranslateDto) {
    return this.aiService.forwardForm(data, AI_URLS_KEYS.TranslateToEn);
  }

  @Post('duration-diabetes')
  @ApiConsumes('multipart/form-data')
  @ApiFile('file')
  @UseInterceptors(FileInterceptor('file'))
  async DurationofDiabetes(@UploadedFile('file') file) {
    return this.aiService.forwardFile({ file: file, key: 'file' }, AI_URLS_KEYS.DurationofDiabetes);
  }

  @Post('covid')
  @ApiConsumes('multipart/form-data')
  @ApiFile('file')
  @UseInterceptors(FileInterceptor('file'))
  async covidScan(@UploadedFile('file') file) {
    return this.aiService.forwardFile({ file: file, key: 'file' }, AI_URLS_KEYS.CovidScan);
  }

  @Post('chest')
  @ApiConsumes('multipart/form-data')
  @ApiFile('file')
  @UseInterceptors(FileInterceptor('file'))
  async chest(@UploadedFile('file') file) {
    return this.aiService.forwardFile({ file: file, key: 'file' }, AI_URLS_KEYS.Chest);
  }

  @Post('stroke')
  @ApiConsumes('multipart/form-data')
  @ApiFile('file')
  @UseInterceptors(FileInterceptor('file'))
  async StrokeHemorrhage(@UploadedFile('file') file) {
    return this.aiService.forwardFile({ file: file, key: 'file' }, AI_URLS_KEYS.StrokeHemorrhage);
  }

  @Post('segmentation/predict')
  @ApiConsumes('multipart/form-data')
  @ApiFile('file')
  @UseInterceptors(FileInterceptor('file'))
  async SegmentationPredict(@UploadedFile('file') file) {
    return this.aiService.forwardFile({ file: file, key: 'file' }, AI_URLS_KEYS.SegmentationPredict);
  }

  @Post('upper-bones')
  @ApiConsumes('multipart/form-data')
  @ApiFile('file')
  @UseInterceptors(FileInterceptor('file'))
  async upperBonesPredict(@UploadedFile('file') file) {
    return this.aiService.forwardFile({ file: file, key: 'file' }, AI_URLS_KEYS.UpperBonesPredict);
  }

  @Post('lower-bones')
  @ApiConsumes('multipart/form-data')
  @ApiFile('file')
  @UseInterceptors(FileInterceptor('file'))
  async lowerBonesPredict(@UploadedFile('file') file) {
    return this.aiService.forwardFile({ file: file, key: 'file' }, AI_URLS_KEYS.LowerBonesPredict);
  }

  @Post('ICD10_Text')
  async ICD10_Text(@Body() data: ICD10TextDto) {
    return this.aiService.forwardForm(data, AI_URLS_KEYS.ICD10_Text);
  }
  @Post('ICD10_Code')
  async ICD10_Code(@Body() data: ICD10CodeDto) {
    return this.aiService.forwardForm(data, AI_URLS_KEYS.ICD10_Code);
  }
  @Post('ICD10/ExtractSymptoms')
  async ICD10_ExtractSymptoms(@Body() data: ICD10TextDto) {
    return this.aiService.forwardForm(data, AI_URLS_KEYS.ICD10_ExtractSymptoms);
  }
  @Post('ICD10/SymptomsCoding')
  async ICD10_SymptomsCoding(@Body() data: ICD10TextDto) {
    return this.aiService.forwardForm(data, AI_URLS_KEYS.ICD10_SymptomsCoding);
  }
}
