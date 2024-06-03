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
import { AbilitieModel, ResidentModel } from '../../../../../domain';
import { Observable, map } from 'rxjs';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { ToastrService } from '../../../shared/services/toastr.service';
import { MatGridListModule } from '@angular/material/grid-list';
import { NgxMaskDirective } from 'ngx-mask';
import { WebCamComponent } from '../../../shared/components/webacam/web-cam.component';
import * as domain from '../../../../../domain';
import { ResidentService } from '../../../shared/services/resident.service';
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
    MatGridListModule,
    NgxMaskDirective,
    WebCamComponent,
  ],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.scss',
})
export class EditComponent {
  residenceList!: Observable<domain.ResidenceModel[]>;
  resident!: domain.ResidenceModel;
  picture: string = '';
  form = new FormGroup({
    name: new FormControl<string>('', [Validators.required]),
    residence: new FormControl<number>(0, [Validators.required]),
    phone: new FormControl<string>('', [Validators.required]),
  });
  constructor(
    private residentService: ResidentService,
    private toastrService: ToastrService,
    private activatedRoute: ActivatedRoute,
    private residenceService: ResidenceService
  ) {}
  ngOnInit() {
    this.activatedRoute.paramMap.subscribe({
      next: (param) => {
        const id = param.get('id');
        if (!id) return;
        this.handleResident(parseInt(id));
      },
    });
    this.handleResidenceList();
  }
  handleResidenceList() {
    this.residenceList = this.residenceService
      .list()
      .pipe(map(({ list }) => list));
  }
  handleResident(id: number): void {
    this.residentService.find(id).subscribe({
      next: (resident) => {
        this.resident = resident;
        this.form.setValue({
          name: resident.name,
          phone: resident.phone || '',
          residence: resident.residencesId,
        });
      },
    });
  }
  submit(): void {
    if (!this.form.valid) return;
    const { value } = this.form;
    this.residentService
      .update({
        id: this.resident.id,
        name: value.name || '',
        phone: value.phone || '',
        residencesId: value.residence || 0,
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
