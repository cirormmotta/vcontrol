import { Component } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import * as domain from '../../../../../domain';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { UserService } from '../../../shared/services/user.service';
import { UpdatePasswordComponent } from '../update-password/update-password.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-users-list',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatCardModule,
    MatDividerModule,
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
    RouterModule,
  ],
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.scss',
})
export class UsersListComponent {
  displayedColumns: string[] = ['name', 'type', 'action'];
  dataSource = new MatTableDataSource<domain.UserModel>([]);
  constructor(private userService: UserService, public dialog: MatDialog) {}
  ngOnInit() {
    this.getUsers();
  }
  getUsers() {
    this.userService.listUser().subscribe({
      next: (userList) => {
        this.dataSource = new MatTableDataSource(userList);
      },
    });
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  remove(id: number): void {
    if (confirm('Deseja excluir?')) {
      this.userService.delete(id).subscribe({
        next: () => {
          this.getUsers();
        },
      });
    }
  }
  changePassword(id: number): void {
    const dialogRef = this.dialog.open(UpdatePasswordComponent, {
      data: { id },
    });

    dialogRef.afterClosed().subscribe((result) => {});
  }
}
