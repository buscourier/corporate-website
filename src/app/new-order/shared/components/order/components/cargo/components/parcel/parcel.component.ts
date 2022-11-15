import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core'
import {
  AbstractControl,
  FormBuilder,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ValidationErrors,
  Validators,
} from '@angular/forms'
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

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    console.log('parcel')
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

  allRequiredFieldsFilled(control: AbstractControl): ValidationErrors | null {
    const controlValue = control.value
    const isValid = controlValue?.email && controlValue?.name
    return isValid ? null : {required: true}
  }

  validate(control: AbstractControl): ValidationErrors | null {
    return null
    // return this.allRequiredFieldsFilled(control)
  }
}
