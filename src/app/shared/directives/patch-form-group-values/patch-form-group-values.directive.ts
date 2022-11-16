import {Directive, Input} from '@angular/core'
import {FormGroupDirective} from '@angular/forms'

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: '[patchFormGroupValues]',
})
export class PatchFormGroupValuesDirective {
  @Input() formGroup: any
  @Input()
  set patchFormGroupValues(val: any) {
    console.log('this.formGroup', this.formGroup)
    console.log('val', val)
    if (!val) return
    this.formGroup.patchValue(val)
    // this.formGroup.patchValue(val, {emitEvent: false})
    // this.formGroupDirective.form.patchValue(val)
    // this.formGroup.markAsPristine()
  }

  constructor(private formGroupDirective: FormGroupDirective) {}
}
