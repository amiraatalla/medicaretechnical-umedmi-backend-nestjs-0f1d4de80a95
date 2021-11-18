import { Logger } from '@nestjs/common';
import { getModelWithString } from '@typegoose/typegoose';
import { registerDecorator, ValidationArguments, ValidationOptions } from 'class-validator';

interface UniqueMongoOptions<RequestType> {
  modelName: string;
  field: string;
  customPropertyName?: string;
}

export function Unique<RequestType>(options: UniqueMongoOptions<RequestType>, validationOptions?: ValidationOptions) {
  return (object: any, propertyName: string) => {
    registerDecorator({
      name: 'unique',
      target: object.constructor,
      propertyName,
      constraints: [],
      options: validationOptions,
      validator: {
        async validate(value: any) {
          const model = getModelWithString(options.modelName);
          let unique = true;

          try {
            unique = !(await model.findOne({ [options.field]: { $eq: value } }, { _id: 1 }));
          } catch (e) {
            unique = false;
            Logger.error(e.message, null, Unique.name);
          }
          return unique;
        },

        defaultMessage(validationArguments?: ValidationArguments): string {
          return `${
            options.customPropertyName ? options.customPropertyName : validationArguments.property
          } must be unique`;
        },
      },
    });
  };
}
