import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ListComponent } from './list/list.component';
import { CreateComponent } from './create/create.component';
import { EditComponent } from './edit/edit.component';

const routes: Routes = [
  {
    path: '',
    component: ListComponent,
    canActivate: [],
  },
  {
    path: 'novo',
    component: CreateComponent,
    canActivate: [],
  },
  {
    path: 'editar/:id',
    component: EditComponent,
    canActivate: [],
  },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class TypeVisitModule {}
