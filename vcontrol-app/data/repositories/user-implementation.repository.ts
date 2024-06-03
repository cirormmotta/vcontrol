import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserEntity } from './entities/user-entity';
import { UserImplementationRepositoryMapper } from './mappers/user-repository.mapper';
import { Injectable } from '@angular/core';
import { UserRepository } from '../../domain/repositories/user.repository';
import { UserModel } from '../../domain/models/user.model';
import { ApiService } from '../untils/services/api.service';
import { DefaultUserResponseModel } from '../../domain';
import { ChangePasswordParam } from '../../domain/usecases/user/change-password.usecase';

@Injectable({
  providedIn: 'root',
})
export class UserImplementationRepository extends UserRepository {
  public userMapper = new UserImplementationRepositoryMapper();

  constructor(private apiService: ApiService) {
    super();
  }
  userList(): Observable<UserModel[]> {
    return this.apiService
      .get<UserEntity[]>('users')
      .pipe(map((users) => users.map(this.userMapper.mapFrom)));
  }
  parseResponse({
    messages,
    user,
  }: {
    messages: string[];
    user: UserEntity;
  }): DefaultUserResponseModel {
    return {
      messages,
      user: this.userMapper.mapFrom(user),
    };
  }
  create(param: UserModel): Observable<DefaultUserResponseModel> {
    return this.apiService
      .post<{ messages: string[]; user: UserEntity }>(
        'users',
        this.userMapper.mapTo(param)
      )
      .pipe(map((response) => this.parseResponse(response)));
  }
  update(param: UserModel): Observable<DefaultUserResponseModel> {
    return this.apiService
      .put<{ messages: string[]; user: UserEntity }>(
        'users/' + param.id,
        this.userMapper.mapTo(param)
      )
      .pipe(map((response) => this.parseResponse(response)));
  }
  find(id: Number): Observable<UserModel> {
    return this.apiService
      .get<UserEntity>('users/' + id)
      .pipe(map(this.userMapper.mapFrom));
  }
  delete(id: Number): Observable<DefaultUserResponseModel> {
    return this.apiService
      .delete<{ messages: string[]; user: UserEntity }>('users/' + id)
      .pipe(map((response) => this.parseResponse(response)));
  }
  changePassword(
    param: ChangePasswordParam
  ): Observable<DefaultUserResponseModel> {
    return this.apiService
      .put<{ messages: string[]; user: UserEntity }>(
        'users/update-password/' + param.id,
        param
      )
      .pipe(map((response) => this.parseResponse(response)));
  }
}
