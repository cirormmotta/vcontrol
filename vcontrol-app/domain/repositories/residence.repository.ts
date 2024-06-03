import { Observable } from 'rxjs';
import {
  DefaultListResponseModel,
  DefaultVisitorResponseModel,
  PaginateModel,
  VisitorModel,
} from '../models';
import { DefaultResidenceResponseModel, ResidenceModel } from '../models/residence.model';

export abstract class ResidenceRepository {
  abstract list(params?: PaginateModel): Observable<DefaultListResponseModel<ResidenceModel>>;
  abstract create(param: ResidenceModel): Observable<DefaultResidenceResponseModel>;
  abstract update(param: ResidenceModel): Observable<DefaultResidenceResponseModel>;
  abstract delete(id: Number): Observable<DefaultResidenceResponseModel>;
  abstract find(id: Number): Observable<ResidenceModel>;
}
