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
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-change-password',
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
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.scss',
})
export class ChangePasswordComponent {
  token: string | null = '';
  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password_confirmation: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
    ]),
  });
  constructor(
    private authService: AuthService,
    private activatedRoute: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.handleParams();
  }
  handleParams(): void {
    this.activatedRoute.paramMap.subscribe((param) => {
      this.token = param.get('token');
    });
  }
  submit(): void {
    if (!this.form.valid) return;
    this.recoverPassword(this.form.value);
  }
  recoverPassword(params: any): void {
    this.authService
      .newPassword({
        token: this.token,
        ...params,
      })
      .subscribe({
        next: (e) => {},
        error: (e) => {},
      });
  }
}
