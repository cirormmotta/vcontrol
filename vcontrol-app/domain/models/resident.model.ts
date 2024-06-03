import { DefaultResponseModel } from './default-response.model';
import { ResidenceModel } from './residence.model';

export interface ResidentModel {
  id?: number;
  name: string;
  phone?: string;
  residencesId: number;
  residence?: ResidenceModel;
}
export interface DefaultResidentResponseModel extends DefaultResponseModel {
  resident: ResidentModel;
}
