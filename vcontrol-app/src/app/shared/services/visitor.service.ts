import { Injectable } from '@angular/core';
import * as domain from '../../../../domain';
import { Observable, catchError, of, tap } from 'rxjs';
import { ToastrService } from './toastr.service';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root',
})
export class VisitorService {
  constructor(
    private visitorRepository: domain.VisitorRepository,
    private toastrService: ToastrService,
    private router: Router
  ) {}
  list(
    params?: domain.VisitorListParams
  ): Observable<domain.VisitorDefaultListResponseModel> {
    return this.visitorRepository.list(params);
  }
  create(
    params: domain.VisitorModel
  ): Observable<domain.DefaultVisitorResponseModel> {
    if (!this.validatePicture(params)) return of();
    return this.visitorRepository.create(params).pipe(
      tap(({ messages }) => {
        this.toastrService.success(messages, 'Tudo certo!');
      })
    );
  }
  validatePicture(params?: domain.VisitorModel): boolean {
    if (params?.picture) return true;
    this.toastrService.error({ messages: 'A foto é obrigatória' }, 'Ops...');
    return false;
  }
  update(
    params: domain.VisitorModel
  ): Observable<domain.DefaultVisitorResponseModel> {
    if (!this.validatePicture(params)) return of();
    return this.visitorRepository.update(params).pipe(
      tap(({ messages }) => {
        this.router.navigate(['/', 'visitantes']);
        this.toastrService.success(messages, 'Tudo certo!');
      })
    );
  }
  delete(id: number): Observable<domain.DefaultVisitorResponseModel> {
    return this.visitorRepository.delete(id).pipe(
      tap(({ messages }) => {
        this.router.navigate(['/', 'visitantes']);
        this.toastrService.success(messages, 'Tudo certo!');
      })
    );
  }
  find(id: number): Observable<domain.VisitorModel> {
    return this.visitorRepository.find(id);
  }
}
