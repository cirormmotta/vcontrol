import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { ApiService } from '../untils/services/api.service';
import * as domain from '../../domain';
import { ResidentImplementationRepositoryMapper } from './mappers/resident-repository.mapper';
import {
  ResidentEntity,
  ResidentResponseEntity,
} from './entities/resident-entity';

@Injectable({
  providedIn: 'root',
})
export class ResidentImplementationRepository extends domain.ResidentRepository {
  residentMapper = new ResidentImplementationRepositoryMapper();
  path: string = 'residents/';
  constructor(private apiService: ApiService) {
    super();
  }
  list(
    params: domain.PaginateModel
  ): Observable<domain.DefaultListResponseModel<domain.ResidentModel>> {
    return this.apiService
      .get<{ count: number; list: ResidentEntity[] }>(this.path, params)
      .pipe(
        map(({ list, count }) => {
          return {
            count,
            list: list.map((residence) =>
              this.residentMapper.mapFrom(residence)
            ),
          };
        })
      );
  }
  create(
    param: domain.ResidentModel
  ): Observable<domain.DefaultResidentResponseModel> {
    return this.apiService
      .post<ResidentResponseEntity>(this.path, this.residentMapper.mapTo(param))
      .pipe(map((response) => this.parseResponse(response)));
  }
  update(
    param: domain.ResidentModel
  ): Observable<domain.DefaultResidentResponseModel> {
    return this.apiService
      .put<ResidentResponseEntity>(
        this.path + param.id,
        this.residentMapper.mapTo(param)
      )
      .pipe(map((response) => this.parseResponse(response)));
  }
  delete(id: Number): Observable<domain.DefaultResidentResponseModel> {
    return this.apiService
      .delete<ResidentResponseEntity>(this.path + id)
      .pipe(map((response) => this.parseResponse(response)));
  }
  find(id: Number): Observable<domain.ResidentModel> {
    return this.apiService
      .get<ResidentEntity>(this.path + id)
      .pipe(map((resident)=>this.residentMapper.mapFrom(resident)));
  }
  parseResponse({
    messages,
    resident,
  }: ResidentResponseEntity): domain.DefaultResidentResponseModel {
    return {
      messages,
      resident: this.residentMapper.mapFrom(resident),
    };
  }
}
