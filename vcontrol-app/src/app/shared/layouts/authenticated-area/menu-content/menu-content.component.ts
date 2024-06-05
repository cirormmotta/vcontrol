import { Component } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { PermissionDirective } from '../../../../security/permission/directives/permission.directive';
import { RouterModule } from '@angular/router';
import { MatIcon } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { UpdatePasswordComponent } from '../../../../pages/users/update-password/update-password.component';
import { MatDividerModule } from '@angular/material/divider';
import { AuthService } from '../../../../pages/auth/services/auth.service';
@Component({
  selector: 'app-menu-content',
  standalone: true,
  imports: [
    MatListModule,
    PermissionDirective,
    RouterModule,
    MatIcon,
    MatDividerModule,
    CommonModule,
  ],
  templateUrl: './menu-content.component.html',
  styleUrl: './menu-content.component.scss',
})
export class MenuContentComponent {
  constructor(public dialog: MatDialog,
    private authService: AuthService
  ) {

  }
  menuList: any[] = [
    {
      title: 'Página inicial',
      path: ['/', 'dashboard'],
      permissions: [],
      icon: 'home',
    },
    {
      title: 'Visitas',
      path: ['/', 'visitas'],
      permissions: [],
      icon: 'badge',
    },
    {
      title: 'Tipos de visita',
      path: ['/', 'tipos-de-visita'],
      permissions: ['configs'],
      icon: 'face',
    },
    {
      title: 'Visitantes',
      path: ['/', 'visitantes'],
      permissions: [],
      icon: 'recent_actors',
    },
    {
      title: 'Residências',
      path: ['/', 'residencias'],
      permissions: [],
      icon: 'apartment',
    },
    {
      title: 'Moradores',
      path: ['/', 'moradores'],
      permissions: [],
      icon: 'person_pin',
    },
    {
      title: 'Usuários',
      path: ['/', 'usuarios'],
      permissions: ['users'],
      icon: 'person',
    },
    {
      title: 'Permissões',
      path: ['/', 'permissoes'],
      permissions: [],
      icon: 'folder_supervised',
    },
  ];
  changePassword(): void {
    this.authService.getProfile().subscribe(({id})=>{
      const dialogRef = this.dialog.open(UpdatePasswordComponent, {
        data: { id },
      });
  
      dialogRef.afterClosed().subscribe((result) => {});
    })
  }
}
