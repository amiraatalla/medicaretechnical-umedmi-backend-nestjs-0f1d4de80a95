import { Injectable } from '@nestjs/common';
import * as randomstring from 'randomstring';

@Injectable()
export class CodeGeneratorService {
  constructor() {}

  async createUniqueInvitationCode(codes: Array<string>) {
    const newInvitationCode = await this.create();
    if (codes.includes(newInvitationCode)) this.createUniqueInvitationCode(codes);
    return newInvitationCode;
  }

  create(maxLength: number = 4, hasCharacter: boolean = false): Promise<string> {
    return randomstring.generate({
      length: maxLength,
      charset: hasCharacter ? 'alphanumeric' : 'numeric',
    });
  }
}
