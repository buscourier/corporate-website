import {ChangeDetectionStrategy, Component, Inject, Self} from '@angular/core'
import {
  FormBuilder,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ValidationErrors,
  Validators,
} from '@angular/forms'
import {TuiDestroyService} from '@taiga-ui/cdk'
import {TUI_VALIDATION_ERRORS} from '@taiga-ui/kit'
import {takeUntil} from 'rxjs'

@Component({
  selector: 'app-courier',
  templateUrl: './courier.component.html',
  styleUrls: ['./courier.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: CourierComponent,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: CourierComponent,
      multi: true,
    },
    {
      provide: TUI_VALIDATION_ERRORS,
      useValue: {
        required: `Все поля обязательны для заполнения`,
      },
    },
    TuiDestroyService,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CourierComponent {
  onTouched = () => {}

  readonly timeRange = ['8.00 - 14.00', '14.00 - 18.00']

  street = this.fb.control(null, [Validators.required])
  building = this.fb.control(null, [Validators.required])
  apartment = this.fb.control(null, [Validators.required])
  time = this.fb.control(this.timeRange[0], [Validators.required])

  form = this.fb.group({
    street: this.street,
    building: this.building,
    apartment: this.apartment,
    time: this.time,
  })

  constructor(
    private fb: FormBuilder,
    @Self() @Inject(TuiDestroyService) private destroy$: TuiDestroyService
  ) {}

  requiredError(): ValidationErrors | null {
    const error = Object.entries(this.form.controls).some(([, control]) => {
      return control.errors && control.errors['required']
    })

    if (error) {
      this.form.setErrors({required: true})
      return {required: true}
    } else {
      return null
    }
  }

  writeValue(value: any) {
    if (value) {
      this.form.setValue(value)
    }
  }

  registerOnTouched(onTouched: any) {
    this.onTouched = onTouched
  }

  registerOnChange(onChange: any) {
    this.form.valueChanges.pipe(takeUntil(this.destroy$)).subscribe(onChange)
  }

  setDisabledState(disabled: boolean) {
    if (disabled) {
      this.form.disable()
    } else {
      this.form.enable()
    }
  }

  validate(): ValidationErrors | null {
    return this.requiredError()
  }
}
