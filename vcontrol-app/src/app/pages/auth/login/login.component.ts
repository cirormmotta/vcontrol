import { Component, ErrorHandler, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroupDirective,
  NgForm,
  Validators,
  FormsModule,
  ReactiveFormsModule,
  FormGroup,
} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { ErrorsHandlerComponent } from '../../../shared/components/form/errors-handler/errors-handler.component';
import { AuthLoginUseCase } from '../../../../../domain/usecases/auth/auth-login.usecase';
import { AuthService } from '../services/auth.service';
import { RouterModule } from '@angular/router';

/** Error when invalid control is dirty, touched, or submitted. */
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatCardModule,
    MatButtonModule,
    ErrorsHandlerComponent,
    RouterModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  form = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.email,
    ]),
    password: new FormControl('', [Validators.required]),
  });
  constructor(private authService: AuthService) {}
  submit(): void {
    if (!this.form.valid) return;
    this.login(this.form.value);
  }
  login(params: any): void {
    this.authService.login(params).subscribe({
      next: () => {},
      error: () => {},
    });
  }
}
