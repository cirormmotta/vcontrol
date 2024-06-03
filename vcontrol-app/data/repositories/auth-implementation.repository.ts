import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { UserEntity } from './entities/user-entity';
import { UserImplementationRepositoryMapper } from './mappers/user-repository.mapper';
import { Injectable } from '@angular/core';
import { AuthModel, UserModel } from '../../domain/models';
import { ApiService } from '../untils/services/api.service';
import { AuthRepository, DefaultResponseModel } from '../../domain';
import { AuthNewPasswordParam } from '../../domain/usecases/auth/new-password.usecase';

@Injectable({
  providedIn: 'root',
})
export class AuthImplementationRepository extends AuthRepository {
  userMapper = new UserImplementationRepositoryMapper();

  constructor(private apiService: ApiService) {
    super();
  }

  login(params: AuthModel): Observable<string> {
    return this.apiService
      .post<{ token: string }>('auth/login', { ...params })
      .pipe(
        map(({ token }) => token),
        tap((token) => this.storeToken(token))
      );
  }
  logout(): Observable<DefaultResponseModel> {
    return this.apiService
      .delete<DefaultResponseModel>('auth/logout')
      .pipe(tap(() => this.cleanSession()));
  }
  getUserProfile(): Observable<UserModel> {
    return this.apiService
      .get<UserEntity>('auth/profile')
      .pipe(map(this.userMapper.mapFrom));
  }
  storeToken(token: string): void {
    localStorage.setItem('token', token);
  }
  cleanSession() {
    localStorage.clear();
  }
  recoverPassword(params: AuthModel): Observable<DefaultResponseModel> {
    return this.apiService.post<DefaultResponseModel>('auth/reset-password', {
      ...params,
    });
  }
  newPassword(params: AuthNewPasswordParam): Observable<DefaultResponseModel> {
    return this.apiService.post<DefaultResponseModel>('auth/create-password', {
      ...params,
    });
  }
  isAuthenticated(): string {
    return localStorage.getItem('token') || '';
  }
}
