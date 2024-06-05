import { Injectable } from '@angular/core';
import * as domain from '../../../../domain';
import { Observable, tap, throwError } from 'rxjs';
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
  create(visit: domain.VisitModel): Observable<domain.VisitDefaultResponseModel> {
    if(!this.validate(visit)) return throwError(() => new Error('Falha ao salvar!'));
    return this.residenceRepository.create(visit).pipe(
      tap(({ messages }) => {
        this.router.navigate(['/', 'visitas']);
        this.toastrService.success(messages, 'Tudo certo!');
      })
    );
  }
  update(visit: domain.VisitModel): Observable<domain.VisitDefaultResponseModel> {
    if(!this.validate(visit)) return throwError(() => new Error('Falha ao salvar!'));
    return this.residenceRepository.update(visit).pipe(
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
  validate(visit: domain.VisitModel): boolean {
    if(visit?.residentId === 0) {
      this.toastrService.error('O morador é obrigatório', 'Ops...');
      return false
    }
    if(visit?.residencesId === 0) {
      this.toastrService.error('A residência é obrigatória', 'Ops...');
      return false
    }
    return true
  }
}
