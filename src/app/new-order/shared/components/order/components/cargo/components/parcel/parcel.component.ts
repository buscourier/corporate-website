import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core'
import {
  FormBuilder,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ValidationErrors,
  Validators,
} from '@angular/forms'
import {TUI_VALIDATION_ERRORS} from '@taiga-ui/kit'
import {Subscription} from 'rxjs'
import {ParcelFormInterface} from '../../types/parcel-form.interface'

@Component({
  selector: 'app-parcel',
  templateUrl: './parcel.component.html',
  styleUrls: ['./parcel.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: ParcelComponent,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: ParcelComponent,
      multi: true,
    },
    {
      provide: TUI_VALIDATION_ERRORS,
      useValue: {
        required: `Все поля обязательны для заполнения`,
        dimensions: (error) => {
          return `Габариты посылки превышают допустимые размеры на ${error.diff} см.`
        },
      },
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ParcelComponent implements OnInit {
  onTouched = () => {}
  onChangeSub: Subscription

  count = this.fb.control('', [Validators.required])
  weight = this.fb.control('', [Validators.required])
  width = this.fb.control('', [Validators.required])
  height = this.fb.control('', [Validators.required])
  length = this.fb.control('', [Validators.required])

  form = this.fb.group<ParcelFormInterface>({
    count: this.count,
    weight: this.weight,
    width: this.width,
    height: this.height,
    length: this.length,
  })

  private maxDimensionsSum = 250

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.form.setValidators(Validators.required)
  }

  deleteParcel(index) {
    // this.parcels.removeAt(index)
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

  dimensionsError(): ValidationErrors | null {
    const fields = this.form.value

    delete fields['count']
    delete fields['weight']

    const fieldsSum = Number(fields.width + fields.height + fields.length)

    const error = fieldsSum > this.maxDimensionsSum

    if (error) {
      this.form.setErrors({
        dimensions: {error: true, diff: fieldsSum - this.maxDimensionsSum},
      })
      return {dimensions: true}
    } else {
      return null
    }
  }

  validate(): ValidationErrors | null {
    return this.requiredError() || this.dimensionsError()
  }
}
