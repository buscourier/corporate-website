import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core'
import {
  AbstractControl,
  FormBuilder,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ValidationErrors,
} from '@angular/forms'
import {Subscription} from 'rxjs'
import {ParcelFormInterface} from '../../types/parcel-form.interface'

@Component({
  selector: 'app-parcels',
  templateUrl: './parcels.component.html',
  styleUrls: ['./parcels.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: ParcelsComponent,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: ParcelsComponent,
      multi: true,
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ParcelsComponent implements OnInit {
  onTouched = () => {}
  onChangeSub: Subscription

  // @ts-ignore
  parcels = this.fb.array<ParcelFormInterface[]>([this.fb.control(null)])

  form = this.fb.group({
    parcels: this.parcels,
  })

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    console.log('parcels')
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
