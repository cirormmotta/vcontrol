import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ErrorsHandlerComponent } from '../../../shared/components/form/errors-handler/errors-handler.component';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { AbilitieModel, ResidenceModel } from '../../../../../domain';
import { Observable } from 'rxjs';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { ToastrService } from '../../../shared/services/toastr.service';
import { ResidenceService } from '../../../shared/services/residence.service';
@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatCardModule,
    MatButtonModule,
    ErrorsHandlerComponent,
    RouterModule,
    MatSelectModule,
  ],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.scss',
})
export class EditComponent {
  residence: ResidenceModel | null = null;
  abilitiesList: Observable<AbilitieModel[]> | null = null;
  form = new FormGroup({
    name: new FormControl<string>('', [Validators.required]),
  });
  constructor(
    private residenceService: ResidenceService,
    private toastrService: ToastrService,
    private activatedRoute: ActivatedRoute
  ) {}
  ngOnInit() {
    this.activatedRoute.paramMap.subscribe({
      next: (param) => {
        const id = param.get('id');
        if (!id) return;
        this.handleUser(parseInt(id));
      },
    });
  }
  handleUser(id: number): void {
    this.residenceService.find(id).subscribe({
      next: (residence) => {
        this.residence = residence;
        this.form.setValue({
          name: residence.name,
        });
      },
    });
  }
  submit(): void {
    if (!this.form.valid) return;
    const { value } = this.form;
    this.residenceService
      .update({
        id: this.residence?.id,
        name: value.name || '',
      })
      .subscribe({
        next: () => {},
        error: (error) => {
          this.toastrService.error(error.error, 'Ops...');
          return error;
        },
      });
  }
}
