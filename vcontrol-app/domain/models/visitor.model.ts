import { DefaultResponseModel, PaginateModel } from './default-response.model';

export interface VisitorModel {
  id?: number;
  name: string;
  cpf: string;
  picture?: string;
  phone: string;
}
export interface DefaultVisitorResponseModel extends DefaultResponseModel {
  visitor: VisitorModel;
}
export interface VisitorDefaultListResponseModel {
  list: VisitorModel[];
  count: number;
}
export interface VisitorListParams extends PaginateModel {
  cpf?: string,
  name?: string
}