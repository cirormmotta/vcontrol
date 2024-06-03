import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CreateVisitComponent } from './create/create-visit.component';
import { ListComponent } from './list/list.component';

const routes: Routes = [
  {
    path: '',
    component: ListComponent,
    canActivate: [],
  },
  {
    path: 'novo',
    component: CreateVisitComponent,
    canActivate: [],
  },
  {
    path: 'editar/:id',
    component: CreateVisitComponent,
    canActivate: [],
  },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class VisitModule {}
