import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes, provideRouter } from '@angular/router';
import { ScrollContentComponent } from '../shared/layouts/unauthenticated-area/scroll-content/scroll-content.component';
import { LoginComponent } from '../pages/auth/login/login.component';
import { UnauthenticatedGuard } from '../security/guards/unauthenticated.guard';
import { RecoveryPasswordComponent } from '../pages/auth/recovery-password/recovery-password.component';
import { ChangePasswordComponent } from '../pages/auth/change-password/change-password.component';

const routes: Routes = [
  {
    path: '',
    component: ScrollContentComponent,
    canActivate: [UnauthenticatedGuard],
    children: [
      {
        path: '',
        component: LoginComponent,
      },
      {
        path: 'recuperar-senha',
        component: RecoveryPasswordComponent,
      },
      {
        path: 'nova-senha/:token',
        component: ChangePasswordComponent,
      },
    ],
  },
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [UnauthenticatedGuard],
})
export class UnauthenticatedAreaModule {}
