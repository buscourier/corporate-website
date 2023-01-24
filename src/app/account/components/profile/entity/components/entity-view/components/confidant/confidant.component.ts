import {ChangeDetectionStrategy, Component, Inject, Self} from '@angular/core'
import {
  FormBuilder,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ValidationErrors,
} from '@angular/forms'
import {TuiDestroyService} from '@taiga-ui/cdk'
import {TUI_VALIDATION_ERRORS} from '@taiga-ui/kit'
import {takeUntil} from 'rxjs'

@Component({
  selector: 'app-confidant',
  templateUrl: './confidant.component.html',
  styleUrls: ['./confidant.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: ConfidantComponent,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: ConfidantComponent,
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
    TuiDestroyService,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfidantComponent {
  name = this.fb.control([{value: '', disabled: true}])
  phone = this.fb.control([{value: '', disabled: true}])
  docNumber = this.fb.control([{value: '', disabled: true}])

  form = this.fb.group({
    name: this.name,
    phone: this.phone,
    docNumber: this.docNumber,
  })

  onTouched = () => {}

  constructor(
    private fb: FormBuilder,
    @Self() @Inject(TuiDestroyService) private destroy$: TuiDestroyService
  ) {}

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
