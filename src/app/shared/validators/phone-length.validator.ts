import {AbstractControl, ValidationErrors} from '@angular/forms'

export function phoneLengthValidator(
  control: AbstractControl
): ValidationErrors | null {
  const text = control.value
  const length = text && text.length
  if (length < 12) {
    return {phoneLength: true}
  } else {
    return null
  }
}
