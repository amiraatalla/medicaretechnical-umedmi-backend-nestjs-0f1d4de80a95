import { RealtimeDatabaseInterface } from './interfaces/realtime-database.interface';
import admin from 'firebase-admin';
import { Injectable } from '@nestjs/common';

@Injectable()
export class RealtimeDatabaseService implements RealtimeDatabaseInterface {
  async insert(path: string, object: any): Promise<string> {
    const result = await admin
      .database()
      .ref(path)
      .push(object)
      .toString();

    return result
      .split('/')
      .slice(3, 5)
      .join('/');
  }

  async update(path: string, object: any) {
    const result = await admin
      .database()
      .ref(path)
      .update(object);
    return true;
  }

  async set(path: string, object: any) {
    const result = await admin
      .database()
      .ref(path)
      .set(object);
    return true;
  }

  async findOne(path: string) {
    const result = await admin
      .database()
      .ref(path)
      .once('value');
    return result.toJSON();
  }
}
