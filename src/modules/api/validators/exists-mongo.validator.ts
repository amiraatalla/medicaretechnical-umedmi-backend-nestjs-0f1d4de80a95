import { HttpException, Logger } from '@nestjs/common';
import { getModelWithString } from '@typegoose/typegoose';
import { registerDecorator, ValidationOptions } from 'class-validator';

interface ExistsOptions<RequestType> {
  modelName: string;
  field: string;
  error?: HttpException;
}

export function Exists<RequestType>(options: ExistsOptions<RequestType>, validationOptions?: ValidationOptions) {
  return (object: any, propertyName: string) => {
    registerDecorator({
      name: 'exists',
      target: object.constructor,
      propertyName,
      constraints: [],
      options: validationOptions,
      validator: {
        async validate(value: any) {
          const model = getModelWithString(options.modelName);
          let exists = false;

          try {
            exists = await model.findOne({ [options.field]: value }, { _id: 1 });
          } catch (e) {
            Logger.error(e.message, null, Exists.name);
          }

          if (exists) {
            return exists;
          } else if (options.error) {
            throw options.error;
          } else {
            return false;
          }
        },
      },
    });
  };
}
