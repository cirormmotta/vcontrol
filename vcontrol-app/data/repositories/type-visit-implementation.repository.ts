import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { ApiService } from '../untils/services/api.service';
import * as domain from '../../domain';
import { TypeVisitImplementationRepositoryMapper } from './mappers';
import { TypeVisitEntity, TypeVisitResponseEntity } from './entities';

@Injectable({
  providedIn: 'root',
})
export class TypeVisitImplementationRepository extends domain.TypeVisitRepository {
  typeVisitMapper = new TypeVisitImplementationRepositoryMapper();
  path: string = 'type-visits/';
  constructor(private apiService: ApiService) {
    super();
  }
  list(paginate?: domain.PaginateModel): Observable<domain.TypeVisitModel[]> {
    return this.apiService
      .get<TypeVisitEntity[]>(this.path, paginate)
      .pipe(map((users) => users.map(this.typeVisitMapper.mapFrom)));
  }
  create(
    param: domain.TypeVisitModel
  ): Observable<domain.TypeVisitDefaultResponseModel> {
    return this.apiService
      .post<TypeVisitResponseEntity>(
        this.path,
        this.typeVisitMapper.mapTo(param)
      )
      .pipe(map((response) => this.parseResponse(response)));
  }
  update(
    param: domain.TypeVisitModel
  ): Observable<domain.TypeVisitDefaultResponseModel> {
    return this.apiService
      .put<TypeVisitResponseEntity>(
        this.path + param.id,
        this.typeVisitMapper.mapTo(param)
      )
      .pipe(map((response) => this.parseResponse(response)));
  }
  delete(id: Number): Observable<domain.TypeVisitDefaultResponseModel> {
    return this.apiService
      .delete<TypeVisitResponseEntity>(this.path + id)
      .pipe(map((response) => this.parseResponse(response)));
  }
  find(id: Number): Observable<domain.TypeVisitModel> {
    return this.apiService
      .get<TypeVisitEntity>(this.path + id)
      .pipe(map((response) => this.typeVisitMapper.mapTo(response)));
  }
  parseResponse({
    messages,
    typeVisit,
  }: TypeVisitResponseEntity): domain.TypeVisitDefaultResponseModel {
    return {
      messages,
      typeVisit: this.typeVisitMapper.mapFrom(typeVisit),
    };
  }
}
