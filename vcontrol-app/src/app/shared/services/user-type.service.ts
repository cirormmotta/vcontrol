import { Injectable } from '@angular/core';
import * as domain from '../../../../domain';
import { Observable, catchError, tap } from 'rxjs';
import { ToastrService } from './toastr.service';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root',
})
export class UserTypeService {
  constructor(
    private userTypeRepository: domain.UserTypeRepository,
    private toastrService: ToastrService,
    private router: Router
  ) {}
  list(): Observable<domain.UserTypeModel[]> {
    return this.userTypeRepository.list();
  }
  create(user: domain.UserTypeModel): Observable<domain.UserTypeDefaultResponseModel> {
    return this.userTypeRepository.create(user).pipe(
      tap(({ messages }) => {
        this.router.navigate(['/', 'permissoes']);
        this.toastrService.success(messages, 'Tudo certo!');
      })
    );
  }
  update(user: domain.UserTypeModel): Observable<domain.UserTypeDefaultResponseModel> {
    return this.userTypeRepository.update(user).pipe(
      tap(({ messages }) => {
        this.router.navigate(['/', 'permissoes']);
        this.toastrService.success(messages, 'Tudo certo!');
      })
    );
  }
  delete(id: number): Observable<domain.UserTypeDefaultResponseModel> {
    return this.userTypeRepository.delete(id).pipe(
      tap(({ messages }) => {
        this.toastrService.success(messages, 'Tudo certo!');
      })
    );
  }
  find(id: number): Observable<domain.UserTypeModel> {
    return this.userTypeRepository.find(id);
  }
  listAbilities(): Observable<domain.AbilitieModel[]> {
    return this.userTypeRepository.allAbilities();
  }
}
