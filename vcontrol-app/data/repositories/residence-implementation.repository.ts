import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { ApiService } from '../untils/services/api.service';
import * as domain from '../../domain';
import { ResidenceImplementationRepositoryMapper } from './mappers/residence-repository.mapper';
import {
  ResidenceEntity,
  ResidenceResponseEntity,
} from './entities/residence-entity';

@Injectable({
  providedIn: 'root',
})
export class ResidenceImplementationRepository extends domain.ResidenceRepository {
  residenceMapper = new ResidenceImplementationRepositoryMapper();
  path: string = 'residences/';
  constructor(private apiService: ApiService) {
    super();
  }
  list(
    params: domain.PaginateModel
  ): Observable<domain.DefaultListResponseModel<domain.ResidenceModel>> {
    return this.apiService
      .get<{ count: number; list: ResidenceEntity[] }>(this.path, params)
      .pipe(
        map(({ list, count }) => {
          return {
            count,
            list: list.map((residence) =>
              this.residenceMapper.mapFrom(residence)
            ),
          };
        })
      );
  }
  create(
    param: domain.ResidenceModel
  ): Observable<domain.DefaultResidenceResponseModel> {
    return this.apiService
      .post<ResidenceResponseEntity>(
        this.path,
        this.residenceMapper.mapTo(param)
      )
      .pipe(map((response) => this.parseResponse(response)));
  }
  update(
    param: domain.ResidenceModel
  ): Observable<domain.DefaultResidenceResponseModel> {
    return this.apiService
      .put<ResidenceResponseEntity>(
        this.path + param.id,
        this.residenceMapper.mapTo(param)
      )
      .pipe(map((response) => this.parseResponse(response)));
  }
  delete(id: Number): Observable<domain.DefaultResidenceResponseModel> {
    return this.apiService
      .delete<ResidenceResponseEntity>(this.path + id)
      .pipe(map((response) => this.parseResponse(response)));
  }
  find(id: Number): Observable<domain.ResidenceModel> {
    return this.apiService
      .get<ResidenceEntity>(this.path + id)
      .pipe(map(this.residenceMapper.mapFrom));
  }
  parseResponse({
    messages,
    residence,
  }: ResidenceResponseEntity): domain.DefaultResidenceResponseModel {
    return {
      messages,
      residence: this.residenceMapper.mapFrom(residence),
    };
  }
}
