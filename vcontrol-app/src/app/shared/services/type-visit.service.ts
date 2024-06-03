import { Injectable } from '@angular/core';
import * as domain from '../../../../domain';
import { Observable, catchError, tap } from 'rxjs';
import { ToastrService } from './toastr.service';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root',
})
export class TypeVisitService {
  constructor(
    private typeVisitRepository: domain.TypeVisitRepository,
    private toastrService: ToastrService,
    private router: Router
  ) {}
  list(params?: domain.PaginateModel): Observable<domain.TypeVisitModel[]> {
    return this.typeVisitRepository.list(params);
  }
  create(user: domain.TypeVisitModel): Observable<domain.TypeVisitDefaultResponseModel> {
    return this.typeVisitRepository.create(user).pipe(
      tap(({ messages }) => {
        this.router.navigate(['/', 'tipos-de-visita']);
        this.toastrService.success(messages, 'Tudo certo!');
      })
    );
  }
  update(user: domain.TypeVisitModel): Observable<domain.TypeVisitDefaultResponseModel> {
    return this.typeVisitRepository.update(user).pipe(
      tap(({ messages }) => {
        this.router.navigate(['/', 'tipos-de-visita']);
        this.toastrService.success(messages, 'Tudo certo!');
      })
    );
  }
  delete(id: number): Observable<domain.TypeVisitDefaultResponseModel> {
    return this.typeVisitRepository.delete(id).pipe(
      tap(({ messages }) => {
        this.toastrService.success(messages, 'Tudo certo!');
      })
    );
  }
  find(id: number): Observable<domain.TypeVisitModel> {
    return this.typeVisitRepository.find(id);
  }
}
