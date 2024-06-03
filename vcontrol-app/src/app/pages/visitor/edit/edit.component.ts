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
import { AbilitieModel, VisitorModel } from '../../../../../domain';
import { Observable } from 'rxjs';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { ToastrService } from '../../../shared/services/toastr.service';
import { VisitorService } from '../../../shared/services/visitor.service';
import { MatGridListModule } from '@angular/material/grid-list';
import { NgxMaskDirective } from 'ngx-mask';
import { WebCamComponent } from '../../../shared/components/webacam/web-cam.component';
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
  visitor: VisitorModel | null = null;
  picture: string = '';
  abilitiesList: Observable<AbilitieModel[]> | null = null;
  form = new FormGroup({
    name: new FormControl<string>('', [Validators.required]),
    cpf: new FormControl<string>('', [Validators.required]),
    phone: new FormControl<string>('', [Validators.required]),
  });
  constructor(
    private visitorService: VisitorService,
    private toastrService: ToastrService,
    private activatedRoute: ActivatedRoute
  ) {}
  ngOnInit() {
    this.activatedRoute.paramMap.subscribe({
      next: (param) => {
        const id = param.get('id');
        if (!id) return;
        this.handleVisitor(parseInt(id));
      },
    });
  }
  handleVisitor(id: number): void {
    this.visitorService.find(id).subscribe({
      next: (visitor) => {
        this.visitor = visitor;
        this.picture = visitor.picture || '';
        this.form.setValue({
          name: visitor.name,
          cpf: visitor.cpf,
          phone: visitor.phone,
        });
      },
    });
  }
  submit(): void {
    if (!this.form.valid) return;
    const { value } = this.form;
    this.visitorService
      .update({
        id: this.visitor?.id,
        picture: this.picture,
        name: value.name || '',
        cpf: value.cpf || '',
        phone: value.phone || '',
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
