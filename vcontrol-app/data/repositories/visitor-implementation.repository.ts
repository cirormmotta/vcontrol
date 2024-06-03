import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { ApiService } from '../untils/services/api.service';
import * as domain from '../../domain';
import { VisitorImplementationRepositoryMapper } from './mappers';
import {
  VisitorEntity,
  VisitorResponseEntity,
} from './entities/visitor-entity';

@Injectable({
  providedIn: 'root',
})
export class VisitorImplementationRepository extends domain.VisitorRepository {
  visiorMapper = new VisitorImplementationRepositoryMapper();
  path: string = 'visitors/';
  constructor(private apiService: ApiService) {
    super();
  }
  list(
    paginate?: domain.VisitorListParams
  ): Observable<domain.VisitorDefaultListResponseModel> {
    return this.apiService
      .get<{ count: number; list: VisitorEntity[] }>(this.path, paginate)
      .pipe(
        map(({ list, count }) => {
          return {
            count,
            list: list.map(this.visiorMapper.mapFrom),
          };
        })
      );
  }
  create(
    param: domain.VisitorModel
  ): Observable<domain.DefaultVisitorResponseModel> {
    return this.apiService
      .post<VisitorResponseEntity>(this.path, this.visiorMapper.mapTo(param))
      .pipe(map((response) => this.parseResponse(response)));
  }
  update(
    param: domain.VisitorModel
  ): Observable<domain.DefaultVisitorResponseModel> {
    return this.apiService
      .put<VisitorResponseEntity>(
        this.path + param.id,
        this.visiorMapper.mapTo(param)
      )
      .pipe(map((response) => this.parseResponse(response)));
  }
  delete(id: Number): Observable<domain.DefaultVisitorResponseModel> {
    return this.apiService
      .delete<VisitorResponseEntity>(this.path + id)
      .pipe(map((response) => this.parseResponse(response)));
  }
  find(id: Number): Observable<domain.VisitorModel> {
    return this.apiService
      .get<VisitorEntity>(this.path + id)
      .pipe(map(this.visiorMapper.mapTo));
  }
  parseResponse({
    messages,
    visitor,
  }: VisitorResponseEntity): domain.DefaultVisitorResponseModel {
    return {
      messages,
      visitor: this.visiorMapper.mapFrom(visitor),
    };
  }
}
