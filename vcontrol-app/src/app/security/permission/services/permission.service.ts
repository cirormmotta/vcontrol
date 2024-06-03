import { Injectable } from '@angular/core';
import * as domain from '../../../../../domain';
import { AuthService } from '../../../pages/auth/services/auth.service';
@Injectable({
  providedIn: 'root',
})
export class PermissionService {
  constructor(
    private userPermissionUseCase: domain.UserPermissionUseCase,
    private atuhService: AuthService
  ) {}
  hasPermission(user: domain.UserModel, abilitie: string): boolean {
    return this.userPermissionUseCase.execute({ user, abilitie });
  }
  currentUserHasPermission(abilitie: string): boolean {
    const currentUser = this.atuhService.getCurrentUser();
    if (currentUser) {
      return this.hasPermission(currentUser, abilitie);
    }
    return false;
  }
}
