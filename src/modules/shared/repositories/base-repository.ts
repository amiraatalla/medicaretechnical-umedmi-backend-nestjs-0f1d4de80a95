import { DocumentType, ModelType } from '@typegoose/typegoose/lib/types';
import { Types } from 'mongoose';
import * as mongoosePaginate from 'mongoose-paginate-v2';
import { mongoose } from '@typegoose/typegoose';
import { PaginateOptions, PaginateResult, PaginateModel, FilterQuery, QueryPopulateOptions } from 'mongoose';
mongoose.plugin(mongoosePaginate);

export class BaseRepository<Model> {
  protected model: ModelType<Model>;
  async save(partial: Partial<Model>, isNew = false): Promise<DocumentType<Model>> {
    const record = new this.model(partial);

    // console.log(partial, isNew, 'repo params');

    if (!isNew && 'id' in partial) {
      record._id = Types.ObjectId(partial['id']);
      record.isNew = false;
    }

    await record.save();

    return record.toObject({ virtuals: true });
  }

  async findById(
    id: string,
    groupBy: object = {},
    populate: QueryPopulateOptions | QueryPopulateOptions[] = null,
  ): Promise<Model> {
    const result = await this.model
      .findById(id, groupBy)
      .populate(populate)
      .exec();
    return result?.toObject({ virtuals: true });
  }

  async findOne(
    query: any,
    projection: object = {},
    populate: QueryPopulateOptions | QueryPopulateOptions[] = null,
  ): Promise<Model> {
    const result = await this.model.findOne(query, projection).populate(populate);
    return result?.toObject({ virtuals: true });
  }
  async findIdOfOne(query: any): Promise<Model> {
    const result = await this.model.findOne(query);
    if (result) return result._id;
    return null;
  }

  async updateOneById(id: any, updates: Partial<Model> | any): Promise<boolean> {
    const result = await this.model.updateOne({ _id: id }, updates);
    return result.n === 1;
  }
  async update(filter: object, updates: Partial<Model> | any): Promise<boolean> {
    const result = await this.model.update(filter, updates);
    return result.n === 1;
  }

  findAll(): Promise<Array<Model>> {
    return this.model.find().exec();
  }

  findByIdAndUpdate(id: string, update: object): Promise<DocumentType<Model>> {
    return this.model.findByIdAndUpdate(id, update, { new: true }).exec();
  }

  findAllWithFilter(
    filter: object,
    populate: QueryPopulateOptions | QueryPopulateOptions[] = null,
  ): Promise<Array<Model>> {
    return this.model
      .find(filter)
      .populate(populate)
      .exec();
  }

  findAllWithProjection(filter: object, groupBy: object): Promise<Array<Model>> {
    return this.model.find(filter, groupBy).exec();
  }

  find(filter: object, groupBy: object, options: object): Promise<Array<Model>> {
    return this.model.find(filter, groupBy, options).exec();
  }
  createIndex(): Promise<void> {
    return this.model.createIndexes();
  }

  deleteById(id: string): any {
    return this.model.findByIdAndRemove(id);
  }
  deleteOne(filter: any): any {
    return this.model.deleteOne(filter);
  }
  deleteMany(filter: any): any {
    return this.model.deleteMany(filter);
  }
  findOneAndUpdate(filter: object, update: object) {
    return this.model.findOneAndUpdate(filter, update, { new: true }).exec();
  }
  async paginate(
    query?: FilterQuery<DocumentType<Model>>,
    options?: PaginateOptions,
    callback?: (err: any, result: PaginateResult<Model>) => void,
  ): Promise<PaginateResult<Model>> {
    // this.paginateModel = getModelForClass(this.paginateModel);
    if (!options.sort) {
      options.sort = { _id: -1 };
    }
    return (<PaginateModel<DocumentType<Model>>>this.model).paginate(query, options, callback);
  }
  insertMany(data: Array<Partial<Model>>) {
    return this.model.insertMany(data);
  }
  remove(query) {
    return this.model.remove(query);
  }
  aggregate(pipeline: any[] = []) {
    return this.model.aggregate(pipeline);
  }
}
