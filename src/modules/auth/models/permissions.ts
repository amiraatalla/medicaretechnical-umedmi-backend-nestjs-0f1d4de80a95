import { ModelOptions, prop } from '@typegoose/typegoose';
@ModelOptions({
  schemaOptions: {
    collection: 'permissions',
  },
})
export class Permissions {
  @prop({ type: String })
  name: string;

  @prop({ type: String, unique: true })
  key: string;
}
