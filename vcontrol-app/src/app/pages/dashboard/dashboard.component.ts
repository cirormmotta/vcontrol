import { Component } from '@angular/core';
import { VisitService } from '../../shared/services/visit.service';
import { VisitModel } from '../../../../domain';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import {
  MatFormField,
  MatFormFieldModule,
  MatLabel,
} from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    RouterModule,
    FormsModule,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  visitList: VisitModel[] = [];
  filterName: string = '';
  searched: boolean = false;
  constructor(private visitService: VisitService) {}
  ngOnInit() {
    this.list();
  }
  list(page: number = 0) {
    this.searched = !!this.filterName;
    this.visitService
      .list({
        name: this.filterName,
        last12hours: 'true',
      })
      .subscribe({
        next: ({ list }) => {
          this.visitList = list;
        },
      });
  }
  clear() {
    this.filterName = '';
    this.list();
  }
  leaveVisit(id?: number): void {
    if(!id) return
    if (confirm('Deseja informar a saída?')) {
      this.visitService.leaveVisit(id).subscribe({
        next: () => {
          this.list();
        },
      });
    }
  }
}
