import { Injectable } from '@angular/core';
import * as domain from '../../../../domain';
import { Observable, tap } from 'rxjs';
import { ToastrService } from './toastr.service';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root',
})
export class VisitService {
  constructor(
    private residenceRepository: domain.VisitRepository,
    private toastrService: ToastrService,
    private router: Router
  ) {}
  list(params?: domain.PaginateModel): Observable<domain.DefaultListResponseModel<domain.VisitModel>> {
    return this.residenceRepository.list(params);
  }
  create(user: domain.VisitModel): Observable<domain.VisitDefaultResponseModel> {
    return this.residenceRepository.create(user).pipe(
      tap(({ messages }) => {
        this.router.navigate(['/', 'visitas']);
        this.toastrService.success(messages, 'Tudo certo!');
      })
    );
  }
  update(user: domain.VisitModel): Observable<domain.VisitDefaultResponseModel> {
    return this.residenceRepository.update(user).pipe(
      tap(({ messages }) => {
        this.router.navigate(['/', 'visitas']);
        this.toastrService.success(messages, 'Tudo certo!');
      })
    );
  }
  delete(id: number): Observable<domain.VisitDefaultResponseModel> {
    return this.residenceRepository.delete(id).pipe(
      tap(({ messages }) => {
        this.toastrService.success(messages, 'Tudo certo!');
      })
    );
  }
  find(id: number): Observable<domain.VisitModel> {
    return this.residenceRepository.find(id);
  }
  leaveVisit(id: number): Observable<domain.VisitDefaultResponseModel> {
    return this.residenceRepository.leaveVisit(id).pipe(
      tap(({ messages }) => {
        this.toastrService.success(messages, 'Tudo certo!');
      })
    );
  }
}
