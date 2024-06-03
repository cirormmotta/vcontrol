import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterOutlet } from '@angular/router';
import { AuthService } from '../../../../pages/auth/services/auth.service';
import { MenuContentComponent } from '../menu-content/menu-content.component';
@Component({
  selector: 'app-scroll-content',
  standalone: true,
  imports: [
    RouterOutlet,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatGridListModule,
    MenuContentComponent,
  ],
  templateUrl: './scroll-content.component.html',
  styleUrl: './scroll-content.component.scss',
})
export class ScrollContentComponent {
  showFiller: boolean = false;
  constructor(private authService: AuthService) {}
  logOut(): void {
    this.authService.logout().subscribe({ next: () => {}, error: () => {} });
  }
}
