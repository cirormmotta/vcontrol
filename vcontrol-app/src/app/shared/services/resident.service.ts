import { Injectable } from '@angular/core';
import * as domain from '../../../../domain';
import { Observable, catchError, tap } from 'rxjs';
import { ToastrService } from './toastr.service';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root',
})
export class ResidentService {
  constructor(
    private residenceRepository: domain.ResidentRepository,
    private toastrService: ToastrService,
    private router: Router
  ) {}
  list(params?: domain.PaginateModel): Observable<domain.DefaultListResponseModel<domain.ResidentModel>> {
    return this.residenceRepository.list(params);
  }
  create(user: domain.ResidentModel): Observable<domain.DefaultResidentResponseModel> {
    return this.residenceRepository.create(user).pipe(
      tap(({ messages }) => {
        this.toastrService.success(messages, 'Tudo certo!');
      })
    );
  }
  update(user: domain.ResidentModel): Observable<domain.DefaultResidentResponseModel> {
    return this.residenceRepository.update(user).pipe(
      tap(({ messages }) => {
        this.router.navigate(['/', 'moradores']);
        this.toastrService.success(messages, 'Tudo certo!');
      })
    );
  }
  delete(id: number): Observable<domain.DefaultResidentResponseModel> {
    return this.residenceRepository.delete(id).pipe(
      tap(({ messages }) => {
        this.toastrService.success(messages, 'Tudo certo!');
      })
    );
  }
  find(id: number): Observable<domain.ResidentModel> {
    return this.residenceRepository.find(id);
  }
}
