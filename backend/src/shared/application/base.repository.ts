import { Result } from "./result.interface";
import { FilterQuery, SaveOptions, QueryOptions } from "mongoose";
import { ResultPaging } from "../entities/result-paging.entity";

export interface RepositoryBase<T> {
  list(filters: FilterQuery<T>, order: any): Promise<Result<T[]>>;
  listOne(filters: FilterQuery<T>): Promise<Result<T>>;
  listByPage(
    filters: FilterQuery<T>,
    order: any,
    pageNum: number,
    pageSize: number
  ): Promise<Result<ResultPaging<T>>>;
  insert(data: Partial<T>, options?: SaveOptions): Promise<Result<T>>;
  insertMany(data: Partial<T>[], options?: SaveOptions): Promise<Result<T[]>>;
  update(
    filters: FilterQuery<T>,
    data: Partial<T>,
    options?: QueryOptions
  ): Promise<Result<T>>;
  updateMany(
    filters: FilterQuery<T>,
    entity: Partial<T>,
    options?: QueryOptions
  ): Promise<Result<any>>;
  remove(filters: FilterQuery<T>, options?: QueryOptions): Promise<Result<T>>;
  removeMany(
    filters: FilterQuery<T>,
    options?: QueryOptions
  ): Promise<Result<any>>;
  count(filters: FilterQuery<T>): Promise<number>;
}
