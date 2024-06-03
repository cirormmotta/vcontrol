import { Observable } from 'rxjs';
import {
  DefaultListResponseModel,
  DefaultVisitorResponseModel,
  PaginateModel,
  VisitorDefaultListResponseModel,
  VisitorListParams,
  VisitorModel,
} from '../models';

export abstract class VisitorRepository {
  abstract list(
    params?: VisitorListParams
  ): Observable<DefaultListResponseModel<VisitorModel>>;
  abstract create(param: VisitorModel): Observable<DefaultVisitorResponseModel>;
  abstract update(param: VisitorModel): Observable<DefaultVisitorResponseModel>;
  abstract delete(id: Number): Observable<DefaultVisitorResponseModel>;
  abstract find(id: Number): Observable<VisitorModel>;
}
