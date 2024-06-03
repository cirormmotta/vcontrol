import { Component } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { PermissionDirective } from '../../../../security/permission/directives/permission.directive';
import { RouterModule } from '@angular/router';
import { MatIcon } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-menu-content',
  standalone: true,
  imports: [
    MatListModule,
    PermissionDirective,
    RouterModule,
    MatIcon,
    CommonModule
  ],
  templateUrl: './menu-content.component.html',
  styleUrl: './menu-content.component.scss'
})
export class MenuContentComponent {
  menuList: any[] = [
    {
      title: 'Visitas',
      path: ['/', 'visitas'],
      permissions: [],
      icon: 'home'
    },
    {
      title: 'Tipos de visita',
      path: ['/', 'tipos-de-visita'],
      permissions: ['configs'],
      icon: 'home'
    },
    {
      title: 'Visitantes',
      path: ['/', 'visitantes'],
      permissions: [],
      icon: 'home'
    },
    {
      title: 'Residências',
      path: ['/', 'residencias'],
      permissions: [],
      icon: 'home'
    },
    {
      title: 'Moradores',
      path: ['/', 'moradores'],
      permissions: [],
      icon: 'home'
    },
    {
      title: 'Usuários',
      path: ['/', 'usuarios'],
      permissions: ['users'],
      icon: 'person'
    },
    {
      title: 'Permissões',
      path: ['/', 'permissoes'],
      permissions: [],
      icon: 'person'
    }
  ]
}
