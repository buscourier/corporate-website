import {ChangeDetectionStrategy, Component} from '@angular/core'
import {
  FormBuilder,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ValidationErrors,
} from '@angular/forms'
import {TUI_VALIDATION_ERRORS} from '@taiga-ui/kit'
import {Subscription} from 'rxjs'

@Component({
  selector: 'app-proxy',
  templateUrl: './proxy.component.html',
  styleUrls: ['./proxy.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: ProxyComponent,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: ProxyComponent,
      multi: true,
    },
    {
      provide: TUI_VALIDATION_ERRORS,
      useValue: {
        required: `Заполните`,
        minlength: (error) => {
          return `Минимум ${error.requiredLength} символа`
        },
        pattern: (error) => {
          return `Только буквы`
        },
      },
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProxyComponent {
  fio = this.fb.control('')
  phone = this.fb.control('')
  docNumber = this.fb.control('')

  form = this.fb.group({})

  onTouched = () => {}
  onChangeSub: Subscription

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

  // requiredError(): ValidationErrors | null {
  //   const error = false
  //
  //   if (error) {
  //     this.form.setErrors({required: true})
  //     return {required: true}
  //   } else {
  //     return null
  //   }
  // }

  validate(): ValidationErrors | null {
    return null
  }
}
