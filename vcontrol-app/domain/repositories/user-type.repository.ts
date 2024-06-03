import { Observable } from 'rxjs';
import {
  UserTypeDefaultResponseModel,
  PaginateModel,
  UserTypeModel,
  AbilitieModel,
} from '../models';

export abstract class UserTypeRepository {
  abstract list(params?: PaginateModel): Observable<UserTypeModel[]>;
  abstract create(
    param: UserTypeModel
  ): Observable<UserTypeDefaultResponseModel>;
  abstract update(
    param: UserTypeModel
  ): Observable<UserTypeDefaultResponseModel>;
  abstract delete(id: Number): Observable<UserTypeDefaultResponseModel>;
  abstract find(id: Number): Observable<UserTypeModel>;
  abstract allAbilities(): Observable<AbilitieModel[]>;
}
