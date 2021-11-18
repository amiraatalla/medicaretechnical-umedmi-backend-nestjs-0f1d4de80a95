export class PartialConstructor<Type> {
  constructor(partial: Partial<Type>) {
    Object.assign(this, partial);
  }
}
