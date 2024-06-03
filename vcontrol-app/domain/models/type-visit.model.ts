import { DefaultResponseModel } from './default-response.model';

export interface TypeVisitModel {
  id?: number;
  name: string;
}
export interface TypeVisitDefaultResponseModel extends DefaultResponseModel {
  typeVisit: TypeVisitModel;
}
