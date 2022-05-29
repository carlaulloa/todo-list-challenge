import { Result } from "../application/result.interface";
import { AnyParamConstructor } from "@typegoose/typegoose/lib/types";
import { getModelForClass, ReturnModelType } from "@typegoose/typegoose";
import { FilterQuery, QueryOptions, SaveOptions } from 'mongoose';
import { ResultPaging } from "../entities/result-paging.entity";
import { unmanaged, injectable } from "inversify";
import { OperationService } from "./operation.service";
import { CustomError } from "../../helper/errors.handler";

@injectable()
export abstract class OperationRepository<
  T,
  U extends AnyParamConstructor<T> = AnyParamConstructor<T>
> {
  private dataModel: ReturnModelType<U, T>;

  constructor(@unmanaged() clazz: U) {
    this.dataModel = getModelForClass<U, T>(clazz);
  }

  getDataModel(): ReturnModelType<U, T> {
    return this.dataModel;
  }

  async insert(entity: Partial<T>, options: SaveOptions = {}): Promise<Result<T>> {
    const trace = OperationService.getTrace();
    const data: T[] = await this.dataModel.create([entity], options);
    return { trace, payload: { data: data[0] } };
  }

  async insertMany(entities: Partial<T>[], options: SaveOptions = {}): Promise<Result<T[]>> {
    const trace = OperationService.getTrace();
    const data: T[] = await this.dataModel.create(entities, options);
    return { trace, payload: { data } };
  }

  async update(filters: FilterQuery<T>, entity: T, options: QueryOptions = {}): Promise<Result<T>> {
    const newOptions = {
      new: true,
      ...options
    }
    const trace = OperationService.getTrace();
    const data: T = await this.dataModel.findOneAndUpdate(filters, entity, newOptions);
    if (!data) {
      throw new CustomError(404, "Not found");
    }
    return { trace, payload: { data } };
  }

  async updateMany(
    filters: FilterQuery<T>,
    entity: Partial<T>,
    options: QueryOptions = {}
  ): Promise<Result<any>> {
    const trace = OperationService.getTrace();
    const data = await this.dataModel.updateMany(filters, { $set: { entity } }, options);
    return { trace, payload: { data } };
  }

  async list(filters: FilterQuery<T> = {}): Promise<Result<T[]>> {
    const trace = OperationService.getTrace();
    const data: T[] = await this.dataModel.find(filters, {});
    return { trace, payload: { data } };
  }

  async listOne(filters: FilterQuery<T>): Promise<Result<T>> {
    const trace = OperationService.getTrace();
    const data: T = await this.dataModel.findOne(filters);
    return { trace, payload: { data } };
  }

  async listByPage(
    filters: FilterQuery<T>,
    order: any,
    pageNum: number,
    pageSize: number
  ): Promise<Result<ResultPaging<T>>> {
    const trace = OperationService.getTrace();
    const data: T[] = await this.dataModel
      .find(filters)
      .sort(order)
      .skip((pageNum - 1) * pageSize)
      .limit(pageSize);
    const totalResults = await this.dataModel.countDocuments(filters);
    return {
      trace,
      payload: {
        data: {
          pageNum,
          pageSize,
          totalResults,
          totalPages: Math.ceil(totalResults / pageSize),
          items: data,
        },
      },
    };
  }

  async remove(filters: FilterQuery<T>, options: QueryOptions = {}): Promise<Result<T>> {
    const trace = OperationService.getTrace();
    const data: T = await this.dataModel.findOneAndRemove(filters, options);
    if (!data) {
      throw new CustomError(404, "Not found");
    }
    return { trace, payload: { data } };
  }

  async removeMany(filters: FilterQuery<T>, options?: QueryOptions): Promise<Result<any>> {
    const trace = OperationService.getTrace();
    const data = await this.dataModel.deleteMany(filters, options);
    return { trace, payload: { data } }
  }
}
