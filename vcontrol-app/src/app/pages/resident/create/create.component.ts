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
import { Router, RouterModule } from '@angular/router';
import { AbilitieModel, ResidenceModel } from '../../../../../domain';
import { Observable, map } from 'rxjs';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { ToastrService } from '../../../shared/services/toastr.service';
import { UserTypeService } from '../../../shared/services/user-type.service';
import { WebCamComponent } from '../../../shared/components/webacam/web-cam.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MASK } from '../../../shared/components/configs/mask.config';
import { NgxMaskDirective } from 'ngx-mask';
import { ResidentService } from '../../../shared/services/resident.service';
import { ResidenceService } from '../../../shared/services/residence.service';
import * as domain from '../../../../../domain';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { UpdatePasswordComponent } from '../../users/update-password/update-password.component';
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
export class CreaterResidentComponent {
  residenceList!: Observable<domain.ResidenceModel[]>;
  picture: string = '';
  form = new FormGroup({
    name: new FormControl<string>('', [Validators.required]),
    residence: new FormControl<number>(0, [Validators.required]),
    phone: new FormControl<string>('', [Validators.required]),
  });
  constructor(
    public dialogRef: MatDialogRef<UpdatePasswordComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private residentService: ResidentService,
    private residenceService: ResidenceService,
    private toastrService: ToastrService,
    private router: Router
  ) {}
  ngOnInit() {
    this.handleResidenceList();
    this.form.get('residence')?.setValue(this.data?.residence);
  }
  handleResidenceList() {
    this.residenceList = this.residenceService
      .list()
      .pipe(map(({ list }) => list));
  }
  submit(): void {
    if (!this.form.valid) return;
    const { value } = this.form;
    this.residentService
      .create({
        name: value.name || '',
        phone: value.phone || '',
        residencesId: value.residence || 0,
      })
      .subscribe({
        next: () => {
          if (this.data?.modal) {
            this.dialogRef.close();
            return;
          }
          this.router.navigate(['/', 'moradores']);
        },
        error: (error) => {
          this.toastrService.error(error.error, 'Ops...');
          return error;
        },
      });
  }
  onNoClick() {
    this.dialogRef.close();
  }
}
