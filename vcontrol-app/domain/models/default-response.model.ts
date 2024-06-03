export interface DefaultResponseModel {
  messages: string[];
  count?: number;
}
export interface PaginateModel {
  page?: number | undefined;
  limit?: number | undefined;
  name?: string | undefined;
  [key: string]: string | number | undefined;
}
export interface DefaultListResponseModel<T> {
  list: T[];
  count: number;
}
