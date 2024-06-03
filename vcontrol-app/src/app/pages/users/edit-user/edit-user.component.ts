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
import { UserModel, UserTypeModel } from '../../../../../domain';
import { Observable } from 'rxjs';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { UserService } from '../../../shared/services/user.service';
import { ToastrService } from '../../../shared/services/toastr.service';
import { UserTypeService } from '../../../shared/services/user-type.service';

@Component({
  selector: 'app-edit-user',
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
  templateUrl: './edit-user.component.html',
  styleUrl: './edit-user.component.scss',
})
export class EditUserComponent {
  userTypeList: Observable<UserTypeModel[]> | null = null;
  user: UserModel | null = null;
  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    name: new FormControl('', [Validators.required]),
    userTypeId: new FormControl(0, [Validators.required]),
  });
  constructor(
    private userService: UserService,
    private userTypeService: UserTypeService,
    private toastrService: ToastrService,
    private activatedRoute: ActivatedRoute
  ) {}
  ngOnInit() {
    this.loadUserType();
    this.activatedRoute.paramMap.subscribe({
      next: (param) => {
        const id = param.get('id');
        if (!id) return;
        this.handleUser(parseInt(id));
      },
    });
  }
  handleUser(id: number): void {
    this.userService.find(id).subscribe({
      next: (user) => {
        this.user = user;
        this.form.setValue({
          email: user.email,
          name: user.name,
          userTypeId: user.userTypeId,
        });
      },
    });
  }
  loadUserType(): void {
    this.userTypeList = this.userTypeService.list();
  }
  submit(): void {
    if (!this.form.valid) return;
    const { value } = this.form;
    this.userService
      .update({
        id: this.user?.id,
        email: value.email || '',
        userTypeId: value.userTypeId || 0,
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
