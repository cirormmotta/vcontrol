import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  GuardResult,
  MaybeAsync,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthService } from '../../pages/auth/services/auth.service';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class AuthenticatedGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router, private toastrService:ToastrService) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): MaybeAsync<GuardResult> {
    return new Observable((subscriber) => {
      this.authService.getProfile().subscribe({
        next: (_) => subscriber.next(true),
        error: (_) => {
          this.toastrService.error('Faça o login para acessar.', 'Ops...');
          localStorage.clear()
          this.router.navigate(['/', 'entrar']);
          subscriber.error(false)
        }
      });
    });
  }
}
