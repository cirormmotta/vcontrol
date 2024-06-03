import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { UsersListComponent } from './users-list/users-list.component';
import { CreateUserComponent } from './create-user/create-user.component';
import { EditUserComponent } from './edit-user/edit-user.component';

const routes: Routes = [
  {
    path: '',
    component: UsersListComponent,
    canActivate: [],
  },
  {
    path: 'novo-usuario',
    component: CreateUserComponent,
    canActivate: [],
  },
  {
    path: 'editar/:id',
    component: EditUserComponent,
    canActivate: [],
  },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class UsersModule {}
