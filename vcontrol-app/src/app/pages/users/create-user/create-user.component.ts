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
import { equalsValidator } from '../../../shared/validators';
import { UserTypeModel } from '../../../../../domain';
import { Observable } from 'rxjs';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { UserService } from '../../../shared/services/user.service';
import { ToastrService } from '../../../shared/services/toastr.service';
import { UserTypeService } from '../../../shared/services/user-type.service';
@Component({
  selector: 'app-create-user',
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
  templateUrl: './create-user.component.html',
  styleUrl: './create-user.component.scss',
})
export class CreateUserComponent {
  userTypeList: Observable<UserTypeModel[]> | null = null;
  form = new FormGroup(
    {
      email: new FormControl<string>('', [
        Validators.required,
        Validators.email,
      ]),
      name: new FormControl<string>('', [Validators.required]),
      userTypeId: new FormControl<number>(0, [Validators.required]),
      password: new FormControl<string>('', [Validators.required]),
      passwordConfirmation: new FormControl<string>('', [Validators.required]),
    },
    {
      validators: equalsValidator('password', 'passwordConfirmation'),
    }
  );
  constructor(
    private userService: UserService,
    private userTypeService: UserTypeService,
    private toastrService: ToastrService
  ) {}
  ngOnInit() {
    this.loadUserType();
  }
  loadUserType(): void {
    this.userTypeList = this.userTypeService.list();
  }
  submit(): void {
    if (!this.form.valid) return;
    const { value } = this.form;
    this.userService
      .create({
        email: value.email || '',
        userTypeId: value.userTypeId || 0,
        password: value.password || '',
        passwordConfirmation: value.passwordConfirmation || '',
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
