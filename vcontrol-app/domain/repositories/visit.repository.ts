import { Observable } from 'rxjs';
import {
  VisitDefaultResponseModel,
  PaginateModel,
  VisitModel,
  DefaultListResponseModel,
} from '../models';

export abstract class VisitRepository {
  abstract list(params?: PaginateModel): Observable<DefaultListResponseModel<VisitModel>>;
  abstract create(param: VisitModel): Observable<VisitDefaultResponseModel>;
  abstract update(param: VisitModel): Observable<VisitDefaultResponseModel>;
  abstract delete(id: Number): Observable<VisitDefaultResponseModel>;
  abstract find(id: Number): Observable<VisitModel>;
}
