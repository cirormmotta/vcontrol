import { AbstractControl, ValidatorFn } from '@angular/forms';

export function equalsValidator(
  field1Name: string,
  field2Name: string
): ValidatorFn {
  return (form: AbstractControl) => {
    if (form.get(field1Name)?.value == form.get(field2Name)?.value) {
      return null;
    }
    return { equals: true };
  };
}
