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
import { RouterModule } from '@angular/router';
import { AbilitieModel } from '../../../../../domain';
import { Observable } from 'rxjs';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { ToastrService } from '../../../shared/services/toastr.service';
import { UserTypeService } from '../../../shared/services/user-type.service';
@Component({
  selector: 'app-create',
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
  templateUrl: './create.component.html',
  styleUrl: './create.component.scss',
})
export class CreateComponent {
  abilitiesList: Observable<AbilitieModel[]> | null = null;
  form = new FormGroup(
    {
      name: new FormControl<string>('', [Validators.required]),
      abilities: new FormControl<string[]>([]),
    }
  );
  constructor(
    private userTypeService: UserTypeService,
    private toastrService: ToastrService
  ) {}
  ngOnInit() {
    this.loadAbilities();
  }
  loadAbilities(): void {
    this.abilitiesList = this.userTypeService.listAbilities();
  }
  submit(): void {
    if (!this.form.valid) return;
    const { value } = this.form;
    this.userTypeService
      .create({
        name: value.name || '',
        abilities: value.abilities || [],
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
