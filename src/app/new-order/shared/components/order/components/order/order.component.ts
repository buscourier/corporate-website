import {ChangeDetectionStrategy, Component, OnDestroy} from '@angular/core'
import {
  AbstractControl,
  FormBuilder,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ValidationErrors,
} from '@angular/forms'
import {Subscription} from 'rxjs'
import {OrderStateInterface} from '../../types/order-state.interface'

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: OrderComponent,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: OrderComponent,
      multi: true,
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrderComponent implements OnDestroy {
  onTouched = () => {}
  onChangeSub: Subscription

  form = this.fb.group<OrderStateInterface>({
    cargo: 'asdasd',
    packages: [],
    services: [],
  })

  constructor(private fb: FormBuilder) {}

  writeValue(value: any) {
    if (value) {
      this.form.setValue(value)
    }
  }

  registerOnTouched(onTouched: any) {
    this.onTouched = onTouched
  }

  registerOnChange(onChange: any) {
    this.onChangeSub = this.form.valueChanges.subscribe(onChange)
  }

  setDisabledState(disabled: boolean) {
    if (disabled) {
      this.form.disable()
    } else {
      this.form.enable()
    }
  }

  allRequiredFieldsFilled(control: AbstractControl): ValidationErrors | null {
    const controlValue = control.value
    const isValid = controlValue?.email && controlValue?.name
    return isValid ? null : {required: true}
  }

  validate(control: AbstractControl): ValidationErrors | null {
    return null
    // return this.allRequiredFieldsFilled(control)
  }

  // ngOnInit(): void {
  //   this.form.updateValueAndValidity()
  // }

  ngOnDestroy() {
    if (this.onChangeSub) {
      this.onChangeSub.unsubscribe()
    }
  }
}
