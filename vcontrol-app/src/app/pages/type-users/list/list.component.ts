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
import { MatDialog } from '@angular/material/dialog';
import { UserTypeService } from '../../../shared/services/user-type.service';

@Component({
  selector: 'app-list',
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
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
})
export class ListComponent {
  displayedColumns: string[] = ['name', 'action'];
  dataSource = new MatTableDataSource<domain.UserTypeModel>([]);
  constructor(
    private userTypeService: UserTypeService,
    public dialog: MatDialog
  ) {}
  ngOnInit() {
    this.list();
  }
  list() {
    this.userTypeService.list().subscribe({
      next: (list) => {
        this.dataSource = new MatTableDataSource(list);
      },
    });
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  remove(id: number): void {
    if (confirm('Deseja excluir?')) {
      this.userTypeService.delete(id).subscribe({
        next: () => {
          this.list();
        },
      });
    }
  }
}
