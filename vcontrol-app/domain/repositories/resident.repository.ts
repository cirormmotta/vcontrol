import { Observable } from 'rxjs';
import {
  DefaultListResponseModel,
  DefaultResidentResponseModel,
  PaginateModel,
  ResidentModel,
} from '../models';

export abstract class ResidentRepository {
  abstract list(params?: PaginateModel): Observable<DefaultListResponseModel<ResidentModel>>;
  abstract create(
    param: ResidentModel
  ): Observable<DefaultResidentResponseModel>;
  abstract update(
    param: ResidentModel
  ): Observable<DefaultResidentResponseModel>;
  abstract delete(id: Number): Observable<DefaultResidentResponseModel>;
  abstract find(id: Number): Observable<ResidentModel>;
}
