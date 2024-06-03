import { Observable } from 'rxjs';
import { UserModel } from '../models/user.model';
import { DefaultResponseModel, DefaultUserResponseModel } from '../models';
import { ChangePasswordParam } from '../usecases/user/change-password.usecase';
import { UserImplementationRepositoryMapper } from '../../data';

export abstract class UserRepository {
  abstract userMapper: UserImplementationRepositoryMapper;
  abstract userList(): Observable<UserModel[]>;
  abstract create(param: UserModel): Observable<DefaultUserResponseModel>;
  abstract update(param: UserModel): Observable<DefaultUserResponseModel>;
  abstract delete(id: Number): Observable<DefaultUserResponseModel>;
  abstract find(id: Number): Observable<UserModel>;
  abstract changePassword(param: ChangePasswordParam): Observable<DefaultUserResponseModel>;
}
