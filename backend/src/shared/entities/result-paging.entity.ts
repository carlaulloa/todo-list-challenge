export interface ResultPaging<T> {
  totalResults: number,
  totalPages: number,
  pageNum: number,
  pageSize: number,
  items: T[]
}