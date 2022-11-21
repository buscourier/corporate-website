import {ChangeDetectionStrategy, Component} from '@angular/core'
import {
  FormBuilder,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ValidationErrors,
  Validators,
} from '@angular/forms'
import {TUI_VALIDATION_ERRORS} from '@taiga-ui/kit'
import {Subscription} from 'rxjs'

const MIN = 4

@Component({
  selector: 'app-docs',
  templateUrl: './docs.component.html',
  styleUrls: ['./docs.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: DocsComponent,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: DocsComponent,
      multi: true,
    },
    {
      provide: TUI_VALIDATION_ERRORS,
      useValue: {
        required: `Укажите количество мест`,
        min: (error) => {
          return `Минимальное количество мест ${error.min}`
        },
      },
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DocsComponent {
  places = this.fb.control(0, [Validators.required, Validators.min(MIN)])

  form = this.fb.group({
    places: this.places,
  })

  constructor(private fb: FormBuilder) {}

  onTouched = () => {}
  onChangeSub: Subscription

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

  requiredError(): ValidationErrors | null {
    const error = this.places.errors && this.places.errors['required']

    if (error) {
      this.form.setErrors({required: true})
      return {required: true}
    } else {
      return null
    }
  }

  minError(): ValidationErrors | null {
    const error = this.places.errors && this.places.errors['min']

    if (error) {
      this.form.setErrors({min: {error: true, min: MIN}})
      return {min: true}
    } else {
      return null
    }
  }

  validate(): ValidationErrors | null {
    return this.minError()
  }
}
