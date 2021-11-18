import { HashInterface } from '../interfaces/hash.interface';
import { ConfigService } from '@nestjs/config';
import { Injectable, Logger } from '@nestjs/common';
import { compare, hash } from 'bcrypt';

@Injectable()
export class HashService implements HashInterface {
  constructor(private configService: ConfigService) {}

  hash(plainText: string): Promise<string> {
    return hash(plainText, '$2b$10$j0ApCRKasvVPFNTuKkiNwO');
  }

  async compare(plainText: string, hashedText: string): Promise<boolean> {
    try {
      return await compare(plainText, hashedText);
    } catch (error) {
      Logger.error(error, 'Hash Service');
    }
  }
}
