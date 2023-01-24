import {ChangeDetectionStrategy, Component, Inject, Self} from '@angular/core'
import {
  AbstractControl,
  FormBuilder,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ValidationErrors,
} from '@angular/forms'
import {TuiDestroyService} from '@taiga-ui/cdk'
import {takeUntil} from 'rxjs'
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
    TuiDestroyService,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ParcelsComponent {
  onTouched = () => {}

  parcels = this.fb.array([])

  form = this.fb.group({
    parcels: this.parcels,
  })

  constructor(
    private fb: FormBuilder,
    @Self() @Inject(TuiDestroyService) private destroy$: TuiDestroyService
  ) {}

  addParcel() {
    this.parcels.push(this.fb.control<ParcelFormInterface>(null))
  }

  deleteParcel(index: number) {
    this.parcels.removeAt(index)
  }

  writeValue(value: any) {
    if (value) {
      value.parcels.forEach(() => {
        this.parcels.push(this.fb.control(null))
      })

      this.form.setValue(value)
    } else {
      this.parcels.push(this.fb.control(null))
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

  invalid(): ValidationErrors | null {
    const invalid = this.parcels.controls.some((control: AbstractControl) => {
      return control.invalid
    })

    if (invalid) {
      return {invalid: true}
    } else {
      return null
    }
  }

  validate(): ValidationErrors | null {
    return this.invalid()
  }
}
