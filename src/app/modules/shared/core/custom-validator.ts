import {AbstractControl, ValidationErrors} from '@angular/forms';

export class  EventLocationValidators {
  static canBeNull(control: AbstractControl): ValidationErrors | null {
    return null;
  }
}
