import { Injectable } from '@angular/core';
import * as domain from '../../../../domain';
import { Observable, catchError, tap } from 'rxjs';
import { ToastrService } from './toastr.service';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root',
})
export class ResidenceService {
  constructor(
    private residenceRepository: domain.ResidenceRepository,
    private toastrService: ToastrService,
    private router: Router
  ) {}
  list(params?: domain.PaginateModel): Observable<domain.DefaultListResponseModel<domain.ResidenceModel> > {
    return this.residenceRepository.list(params);
  }
  create(user: domain.ResidenceModel): Observable<domain.DefaultResidenceResponseModel> {
    return this.residenceRepository.create(user).pipe(
      tap(({ messages }) => {
        this.router.navigate(['/', 'residencias']);
        this.toastrService.success(messages, 'Tudo certo!');
      })
    );
  }
  update(user: domain.ResidenceModel): Observable<domain.DefaultResidenceResponseModel> {
    return this.residenceRepository.update(user).pipe(
      tap(({ messages }) => {
        this.router.navigate(['/', 'residencias']);
        this.toastrService.success(messages, 'Tudo certo!');
      })
    );
  }
  delete(id: number): Observable<domain.DefaultResidenceResponseModel> {
    return this.residenceRepository.delete(id).pipe(
      tap(({ messages }) => {
        this.toastrService.success(messages, 'Tudo certo!');
      })
    );
  }
  find(id: number): Observable<domain.ResidenceModel> {
    return this.residenceRepository.find(id);
  }
}
