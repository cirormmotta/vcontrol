import { Component, Input } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';

export class ControlErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
@Component({
  selector: 'app-errors-handler',
  standalone: true,
  imports: [MatFormFieldModule],
  templateUrl: './errors-handler.component.html',
  styleUrl: './errors-handler.component.scss'
})
export class ErrorsHandlerComponent {
  @Input() control: FormControl = new FormControl()
  @Input() form: FormGroupDirective | NgForm | null = null
  @Input() controlTitle: string = ''
  controlErrorStateMatcher = new ControlErrorStateMatcher()
}
