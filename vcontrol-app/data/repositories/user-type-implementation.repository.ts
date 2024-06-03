import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { ApiService } from '../untils/services/api.service';
import * as domain from '../../domain';
import { UserTypeImplementationRepositoryMapper } from './mappers';
import { UserTypeEntity, UserTypeResponseEntity } from './entities';

@Injectable({
  providedIn: 'root',
})
export class UserTypeImplementationRepository extends domain.UserTypeRepository {
  typeVisitMapper = new UserTypeImplementationRepositoryMapper();
  path: string = 'user-types/';
  constructor(private apiService: ApiService) {
    super();
  }
  list(paginate?: domain.PaginateModel): Observable<domain.UserTypeModel[]> {
    return this.apiService
      .get<UserTypeEntity[]>(this.path, paginate)
      .pipe(map((users) => users.map(this.typeVisitMapper.mapFrom)));
  }
  create(
    param: domain.UserTypeModel
  ): Observable<domain.UserTypeDefaultResponseModel> {
    return this.apiService
      .post<UserTypeResponseEntity>(
        this.path,
        this.typeVisitMapper.mapTo(param)
      )
      .pipe(map((response) => this.parseResponse(response)));
  }
  update(
    param: domain.UserTypeModel
  ): Observable<domain.UserTypeDefaultResponseModel> {
    return this.apiService
      .put<UserTypeResponseEntity>(
        this.path + param.id,
        this.typeVisitMapper.mapTo(param)
      )
      .pipe(map((response) => this.parseResponse(response)));
  }
  delete(id: Number): Observable<domain.UserTypeDefaultResponseModel> {
    return this.apiService
      .delete<UserTypeResponseEntity>(this.path + id)
      .pipe(map((response) => this.parseResponse(response)));
  }
  find(id: Number): Observable<domain.UserTypeModel> {
    return this.apiService
      .get<UserTypeEntity>(this.path + id)
      .pipe(map(this.typeVisitMapper.mapFrom));
  }
  allAbilities(): Observable<domain.AbilitieModel[]> {
    return this.apiService
      .get<{ [key: string]: string }>(this.path + 'abilities')
      .pipe(
        map((abilities) => {
          return Object.keys(abilities).map((key) => {
            return {
              id: key,
              name: abilities[key],
            };
          });
        })
      );
  }
  parseResponse({
    messages,
    userType,
  }: UserTypeResponseEntity): domain.UserTypeDefaultResponseModel {
    return {
      messages,
      userType: this.typeVisitMapper.mapFrom(userType),
    };
  }
}
