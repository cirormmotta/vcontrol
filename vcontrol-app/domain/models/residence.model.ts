import { DefaultResponseModel } from './default-response.model';
import { ResidentModel } from './resident.model';

export interface ResidenceModel {
  id?: number;
  name: string;
  residents?: ResidentModel[];
}
export interface DefaultResidenceResponseModel extends DefaultResponseModel {
  residence: ResidenceModel;
}
