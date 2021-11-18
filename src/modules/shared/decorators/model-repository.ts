import { InjectModel } from 'nestjs-typegoose';
import { TypegooseClass } from 'nestjs-typegoose/dist/typegoose-class.interface';

export function ModelRepository(type: TypegooseClass) {
  return (constructor: any) => {
    InjectModel(type)(new constructor(), 'model');
  };
}
