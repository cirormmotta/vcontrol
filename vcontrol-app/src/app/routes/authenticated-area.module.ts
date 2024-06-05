import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ScrollContentComponent } from '../shared/layouts/authenticated-area/scroll-content/scroll-content.component';
import { AuthenticatedGuard } from '../security/guards/authenticated.guard';
import { DashboardComponent } from '../pages/dashboard/dashboard.component';
const routes: Routes = [
  {
    path: '',
    component: ScrollContentComponent,
    canActivate: [AuthenticatedGuard],
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent,
      },
      {
        path: 'usuarios',
        loadChildren: () =>
          import('../pages/users/users.module').then((m) => m.UsersModule),
      },
      {
        path: 'permissoes',
        loadChildren: () =>
          import('../pages/type-users/type-users.module').then(
            (m) => m.TypeUsersModule
          ),
      },
      {
        path: 'visitantes',
        loadChildren: () =>
          import('../pages/visitor/visitor.module').then(
            (m) => m.VisitorModule
          ),
      },
      {
        path: 'residencias',
        loadChildren: () =>
          import('../pages/residence/residence.module').then(
            (m) => m.ResidenceModule
          ),
      },
      {
        path: 'moradores',
        loadChildren: () =>
          import('../pages/resident/resident.module').then(
            (m) => m.ResidentModule
          ),
      },
      {
        path: 'tipos-de-visita',
        loadChildren: () =>
          import('../pages/type-visit/type-visit.module').then(
            (m) => m.TypeVisitModule
          ),
      },
      {
        path: 'visitas',
        loadChildren: () =>
          import('../pages/visit/visit.module').then((m) => m.VisitModule),
      },
    ],
  },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
  providers: [AuthenticatedGuard],
})
export class AuthenticatedAreaModule {}
