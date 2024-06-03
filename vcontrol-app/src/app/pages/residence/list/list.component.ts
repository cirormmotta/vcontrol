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
import { ResidenceService } from '../../../shared/services/residence.service';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatCardModule,
    MatDividerModule,
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
    RouterModule,
    MatPaginatorModule,
    FormsModule,
  ],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
})
export class ListComponent {
  filterName: string = '';
  count: number = 0;
  displayedColumns: string[] = ['name', 'action'];
  dataSource = new MatTableDataSource<domain.ResidenceModel>([]);
  searched: boolean = false;
  constructor(
    private userTypeService: ResidenceService,
    public dialog: MatDialog
  ) {}
  ngOnInit() {
    this.list();
  }
  list(page: number = 0) {
    this.searched = !!this.filterName;
    this.userTypeService
      .list({
        page,
        limit: 10,
        name: this.filterName,
      })
      .subscribe({
        next: ({ list, count }) => {
          this.dataSource = new MatTableDataSource(list);
          this.count = count;
        },
      });
  }
  clear() {
    this.filterName = '';
    this.list();
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
  handlePageEvent(e: PageEvent) {
    this.list(e.pageIndex);
  }
}
