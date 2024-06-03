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
import { AbilitieModel, UserTypeModel } from '../../../../../domain';
import { Observable } from 'rxjs';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { ToastrService } from '../../../shared/services/toastr.service';
import { UserTypeService } from '../../../shared/services/user-type.service';

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
  userType: UserTypeModel | null = null;
  abilitiesList: Observable<AbilitieModel[]> | null = null;
  form = new FormGroup({
    name: new FormControl<string>('', [Validators.required]),
    abilities: new FormControl<string[]>([]),
  });
  constructor(
    private userTypeService: UserTypeService,
    private toastrService: ToastrService,
    private activatedRoute: ActivatedRoute
  ) {}
  ngOnInit() {
    this.loadAbilities();
    this.activatedRoute.paramMap.subscribe({
      next: (param) => {
        const id = param.get('id');
        if (!id) return;
        this.handleUser(parseInt(id));
      },
    });
  }
  handleUser(id: number): void {
    this.userTypeService.find(id).subscribe({
      next: (userType) => {
        this.userType = userType;
        this.form.setValue({
          name: userType.name,
          abilities: userType.abilities || [],
        });
      },
    });
  }
  loadAbilities(): void {
    this.abilitiesList = this.userTypeService.listAbilities();
  }
  submit(): void {
    if (!this.form.valid) return;
    const { value } = this.form;
    this.userTypeService
      .update({
        id: this.userType?.id,
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
