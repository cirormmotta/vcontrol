import { Observable } from 'rxjs';
import {
  TypeVisitDefaultResponseModel,
  PaginateModel,
  TypeVisitModel,
} from '../models';

export abstract class TypeVisitRepository {
  abstract list(params?: PaginateModel): Observable<TypeVisitModel[]>;
  abstract create(
    param: TypeVisitModel
  ): Observable<TypeVisitDefaultResponseModel>;
  abstract update(
    param: TypeVisitModel
  ): Observable<TypeVisitDefaultResponseModel>;
  abstract delete(id: Number): Observable<TypeVisitDefaultResponseModel>;
  abstract find(id: Number): Observable<TypeVisitModel>;
}
