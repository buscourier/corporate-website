import {Directive, Input} from '@angular/core'
import {NgControl} from '@angular/forms'

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: '[setControlValue]',
})
export class SetControlValueDirective {
  @Input()
  set setControlValue(val: any) {
    this.ngControl.control.setValue(val, {emitEvent: false})
  }

  constructor(private ngControl: NgControl) {}
}
