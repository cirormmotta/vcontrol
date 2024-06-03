import { DefaultResponseModel } from './default-response.model';
import { ResidenceModel } from './residence.model';
import { ResidentModel } from './resident.model';
import { TypeVisitModel } from './type-visit.model';
import { VisitorModel } from './visitor.model';

export interface VisitModel {
  id?: number;
  carLicensePlate?: string;
  residencesId: number;
  residentId: number;
  typeVisitId: number;
  visitorId: number;
  residence?: ResidenceModel;
  resident?: ResidentModel;
  typeVisit?: TypeVisitModel;
  visitor?: VisitorModel;
}
export interface VisitDefaultResponseModel extends DefaultResponseModel {
  visit: VisitModel;
}
