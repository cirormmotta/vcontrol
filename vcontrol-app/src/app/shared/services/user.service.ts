import { Injectable } from '@angular/core';
import * as domain from '../../../../domain';
import { Observable, catchError, tap } from 'rxjs';
import { ToastrService } from './toastr.service';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(
    private userRepository: domain.UserRepository,
    private toastrService: ToastrService,
    private router: Router
  ) {}
  listUser(): Observable<domain.UserModel[]> {
    return this.userRepository.userList();
  }
  create(user: domain.UserModel): Observable<domain.DefaultUserResponseModel> {
    return this.userRepository.create(user).pipe(
      tap(({ messages }) => {
        this.router.navigate(['/', 'usuarios']);
        this.toastrService.success(messages, 'Tudo certo!');
      })
    );
  }
  update(user: domain.UserModel): Observable<domain.DefaultUserResponseModel> {
    return this.userRepository.update(user).pipe(
      tap(({ messages }) => {
        this.router.navigate(['/', 'usuarios']);
        this.toastrService.success(messages, 'Tudo certo!');
      })
    );
  }
  delete(id: number): Observable<domain.DefaultUserResponseModel> {
    return this.userRepository.delete(id).pipe(
      tap(({ messages }) => {
        this.toastrService.success(messages, 'Tudo certo!');
      })
    );
  }
  find(id: number): Observable<domain.UserModel> {
    return this.userRepository.find(id);
  }
  changePassword(
    params: domain.ChangePasswordParam
  ): Observable<domain.DefaultUserResponseModel> {
    return this.userRepository.changePassword(params).pipe(
      tap(({ messages }) => {
        this.toastrService.success(messages, 'Tudo certo!');
      })
    );
  }
}
