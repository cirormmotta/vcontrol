import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'entrar',
    loadChildren: () =>
      import('./unauthenticated-area.module').then(
        (m) => m.UnauthenticatedAreaModule
      ),
  },
  {
    path: '',
    redirectTo: 'entrar',
    pathMatch: 'full',
  },
  {
    path: '',
    loadChildren: () =>
      import('./authenticated-area.module').then(
        (m) => m.AuthenticatedAreaModule
      ),
  },
];
