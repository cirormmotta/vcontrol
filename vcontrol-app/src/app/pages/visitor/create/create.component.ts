import { Component, Inject } from '@angular/core';
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
import { WebCamComponent } from '../../../shared/components/webacam/web-cam.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MASK } from '../../../shared/components/configs/mask.config';
import { NgxMaskDirective } from 'ngx-mask';
import { VisitorService } from '../../../shared/services/visitor.service';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
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
    WebCamComponent,
    MatGridListModule,
    NgxMaskDirective,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
  ],
  templateUrl: './create.component.html',
  styleUrl: './create.component.scss',
})
export class CreateVisitorComponent {
  abilitiesList: Observable<AbilitieModel[]> | null = null;
  picture: string = '';
  form = new FormGroup({
    name: new FormControl<string>('', [Validators.required]),
    cpf: new FormControl<string>('', [Validators.required]),
    phone: new FormControl<string>('', [Validators.required]),
  });
  constructor(
    public dialogRef: MatDialogRef<CreateVisitorComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private visitorService: VisitorService,
    private toastrService: ToastrService
  ) {}
  submit(): void {
    if (!this.form.valid) return;
    const { value } = this.form;
    this.visitorService
      .create({
        name: value.name || '',
        cpf: value.cpf || '',
        phone: value.phone || '',
        picture: this.picture,
      })
      .subscribe({
        next: ({visitor}) => {
          this.dialogRef.close(visitor);
        },
        error: (error) => {
          this.toastrService.error(error.error, 'Ops...');
          return error;
        },
      });
  }
  ngOnInit() {
    this.form.get('cpf')?.setValue(this.data?.cpf)
  }
  onNoClick() {
    this.dialogRef.close();
  }
}
