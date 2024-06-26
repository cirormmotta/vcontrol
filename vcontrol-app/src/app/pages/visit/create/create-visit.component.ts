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
import {
  ResidenceModel,
  ResidentModel,
} from '../../../../../domain';
import { Observable, Subject, debounceTime } from 'rxjs';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { ToastrService } from '../../../shared/services/toastr.service';
import { WebCamComponent } from '../../../shared/components/webacam/web-cam.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { NgxMaskDirective } from 'ngx-mask';
import { VisitService } from '../../../shared/services/visit.service';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import * as domain from '../../../../../domain';
import { CreaterResidentComponent } from '../../resident/create/create.component';
import { MatDialog } from '@angular/material/dialog';
import { MatIcon } from '@angular/material/icon';
import { VisitorService } from '../../../shared/services/visitor.service';
import { CreateVisitorComponent } from '../../visitor/create/create.component';
import { TypeVisitService } from '../../../shared/services/type-visit.service';
import { ResidentService } from '../../../shared/services/resident.service';
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
    MatAutocompleteModule,
    CreaterResidentComponent,
    MatIcon,
  ],
  templateUrl: './create-visit.component.html',
  styleUrl: './create-visit.component.scss',
})
export class CreateVisitComponent {
  visit?: domain.VisitModel;
  searchResidenceSubject = new Subject<string | null>();
  form = new FormGroup({
    resident: new FormControl<string>('', [Validators.required]),
    car_license_plate: new FormControl<string>(''),
    typeVisitId: new FormControl<number>(0, [Validators.required]),
    visitor: new FormControl<string>('', [Validators.required]),
  });
  residence!: ResidenceModel | undefined;
  resident!: ResidentModel | undefined;
  visitor!: domain.VisitorModel | undefined;
  filteredOptions: ResidentModel[] = [];
  typeVisitList: domain.TypeVisitModel[] = [];
  loadingVisitor: boolean = false;
  residents: ResidentModel[] = [];
  constructor(
    private residentService: ResidentService,
    private visitService: VisitService,
    private typeVisitService: TypeVisitService,
    private visitorService: VisitorService,
    private toastrService: ToastrService,
    public dialog: MatDialog,
    private activatedRoute: ActivatedRoute
  ) {}
  ngOnInit() {
    this.activatedRoute.paramMap.subscribe({
      next: (param) => {
        const id = param.get('id');
        if (!id) return this.handleChanges();
        this.handleVisitor(parseInt(id));
      },
    });
  }
  handleChanges(): void {
    this.searchResidenceSubject
      .pipe(debounceTime(300))
      .subscribe((searchValue) => {
        this.listResidents(searchValue);
      });
    this.typeVisitService.list().subscribe({
      next: (list) => {
        this.typeVisitList = list;
      },
    });
    this.form.get('resident')?.valueChanges.subscribe({
      next: (value) => {
        this.filterResident(value || '');
      },
    });
    this.handleChangeVisitor();
  }
  filterResident(name: string): void {
    this.residence = this.filteredOptions?.find((r) => r.name === name);
    this.searchResidenceSubject.next(name);
  }
  handleChangeVisitor(): void {
    const visitorInput = this.form.get('visitor');
    visitorInput?.valueChanges.subscribe({
      next: (cpf) => {
        if (!visitorInput.valid || this.loadingVisitor) return;
        this.loadingVisitor = true;
        this.visitorService
          .list({
            cpf: cpf || '',
          })
          .subscribe({
            error: () => (this.loadingVisitor = false),
            next: ({ list }) => {
              this.loadingVisitor = false;
              if (list.length > 0) {
                this.visitor = list[0];
                return;
              }
              this.createVisitor(cpf || '');
            },
          });
      },
    });
  }
  selectResident(resident: ResidentModel) {
    this.resident = resident;
    this.residence = resident.residence;
  }
  handleVisitor(id: number): void {
    this.visitService.find(id).subscribe({
      next: (visit) => {
        this.visit = visit;
        this.visitor = visit.visitor;
        this.residence = visit.residence;
        this.residents = visit?.residence?.residents
          ? visit.residence?.residents
          : [];
          console.log(visit?.resident)
        this.form.setValue({
          car_license_plate: visit?.carLicensePlate || null,
          resident: visit?.resident?.name || '',
          typeVisitId: visit.typeVisitId,
          visitor: visit?.visitor?.cpf || null,
        });
        this.handleChanges();
      },
    });
  }
  listResidents(name: string | null) {
    if (!name) return;
    this.residentService.list({ name }).subscribe(({ list }) => {
      this.filteredOptions = list;
    });
  }
  createResident(): void {
    const dialogRef = this.dialog.open(CreaterResidentComponent, {
      data: {
        modal: true,
        residence: this.residence?.id,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.form.get('resident')?.setValue(result?.name)
      this.resident = result
      this.residence = result?.residence
    });
  }
  createVisitor(cpf: string): void {
    this.visitor = undefined;
    const dialogRef = this.dialog.open(CreateVisitorComponent, {
      data: {
        modal: true,
        cpf: cpf,
      },
    });

    this.visitor = undefined;
    dialogRef.afterClosed().subscribe((result) => {
      console.log('createVisitor', result);
      if (result) {
        this.visitor = result;
        this.form.get('visitor')?.setValue(result?.cpf);
      }
    });
  }
  save(): Observable<domain.VisitDefaultResponseModel> {
    const visit = this.handlePayload();
    if (this.visit) {
      return this.visitService.update(visit);
    }
    return this.visitService.create(visit);
  }
  handlePayload(): domain.VisitModel {
    const { value } = this.form;
    return {
      id: this.visit?.id,
      carLicensePlate: value.car_license_plate || '',
      residencesId: this.residence?.id || 0,
      residentId: this.resident?.id || 0,
      visitorId: this.visitor?.id || 0,
      typeVisitId: value.typeVisitId || 0,
    };
  }
  submit(): void {
    if (!this.form.valid) return;
    this.save().subscribe({
      next: () => {},
      error: (error) => {
        this.toastrService.error(error, 'Ops...');
        return error;
      },
    });
  }
}
