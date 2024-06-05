import { Injectable } from '@angular/core';
import * as domain from '../../../../../domain';
import { Observable, catchError, map, tap } from 'rxjs';
import { Router } from '@angular/router';
import { ToastrService } from '../../../shared/services/toastr.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  protected currentUser?: domain.UserModel | null = null;
  constructor(
    private authRepository: domain.AuthRepository,
    private router: Router,
    public toastrService: ToastrService
  ) {}
  login(params: any): Observable<domain.UserModel> | any {
    return this.authRepository.login(params).pipe(
      tap(() => {
        this.toastrService.success('Seja bem vind@!', 'Tudo certo!');
        this.router.navigate(['/', 'dashboard']);
      }),
      catchError((error) => {
        this.toastrService.error(error.error.messages, 'Ops...');
        return error;
      })
    );
  }
  recoverPassword(params: any): Observable<any> {
    return this.authRepository.recoverPassword(params).pipe(
      tap(({ messages }) => {
        this.toastrService.success(messages, 'Tudo certo!');
        this.router.navigate(['/', 'dashboard']);
      }),
      catchError((error) => {
        this.toastrService.error(error.error.messages, 'Ops...');
        return '';
      })
    );
  }
  newPassword(
    params: domain.AuthNewPasswordParam
  ): Observable<domain.DefaultResponseModel | any> {
    return this.authRepository.newPassword(params).pipe(
      tap(({ messages }) => {
        this.toastrService.success(messages, 'Tudo certo!');
        this.router.navigate(['/', 'entrar']);
      }),
      catchError((error) => {
        this.toastrService.error(error.error.messages, 'Ops...');
        return error;
      })
    );
  }
  logout() {
    return this.authRepository.logout().pipe(
      tap(() => {
        this.router.navigate(['/', 'entrar']);
      })
    );
  }
  isAuthenticated(): string {
    return this.authRepository.isAuthenticated();
  }
  getProfile(): Observable<domain.UserModel> {
    return this.authRepository
      .getUserProfile()
      .pipe(map((user) => (this.currentUser = user)));
  }
  getCurrentUser(): domain.UserModel | null | undefined {
    return this.currentUser;
  }
}
