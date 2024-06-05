import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { ApiService } from '../untils/services/api.service';
import * as domain from '../../domain';
import { VisitImplementationRepositoryMapper } from './mappers';
import { VisitEntity, VisitResponseEntity } from './entities';

@Injectable({
  providedIn: 'root',
})
export class VisitImplementationRepository extends domain.VisitRepository {
  visitMapper = new VisitImplementationRepositoryMapper();
  path: string = 'visits/';
  constructor(private apiService: ApiService) {
    super();
  }
  list(
    paginate?: domain.PaginateModel
  ): Observable<domain.DefaultListResponseModel<domain.VisitModel>> {
    return this.apiService
      .get<{ count: number; list: VisitEntity[] }>(this.path, paginate)
      .pipe(
        map(({ list, count }) => {
          return {
            count,
            list: list.map((residence) => this.visitMapper.mapFrom(residence)),
          };
        })
      );
  }
  create(
    param: domain.VisitModel
  ): Observable<domain.VisitDefaultResponseModel> {
    return this.apiService
      .post<VisitResponseEntity>(this.path, this.visitMapper.mapTo(param))
      .pipe(map((response) => this.parseResponse(response)));
  }
  update(
    param: domain.VisitModel
  ): Observable<domain.VisitDefaultResponseModel> {
    return this.apiService
      .put<VisitResponseEntity>(
        this.path + param.id,
        this.visitMapper.mapTo(param)
      )
      .pipe(map((response) => this.parseResponse(response)));
  }
  delete(id: Number): Observable<domain.VisitDefaultResponseModel> {
    return this.apiService
      .delete<VisitResponseEntity>(this.path + id)
      .pipe(map((response) => this.parseResponse(response)));
  }
  leaveVisit(id: Number): Observable<domain.VisitDefaultResponseModel> {
    return this.apiService
      .get<VisitResponseEntity>(this.path + id + '/leave')
      .pipe(map((response) => this.parseResponse(response)));
  }
  find(id: Number): Observable<domain.VisitModel> {
    return this.apiService
      .get<VisitEntity>(this.path + id)
      .pipe(map((response) => this.visitMapper.mapFrom(response)));
  }
  parseResponse({
    messages,
    visit,
  }: VisitResponseEntity): domain.VisitDefaultResponseModel {
    return {
      messages,
      visit: this.visitMapper.mapFrom(visit),
    };
  }
}
