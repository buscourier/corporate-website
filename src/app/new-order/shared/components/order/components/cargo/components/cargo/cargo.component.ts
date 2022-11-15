import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core'
import {
  AbstractControl,
  FormBuilder,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ValidationErrors,
} from '@angular/forms'
import {Store} from '@ngrx/store'
import {filter, Observable, of, Subscription, switchMap} from 'rxjs'
import {concatAll, tap, toArray} from 'rxjs/operators'
import {CargoInterface} from '../../../../../../types/cargo.interface'
import {allCargosSelector} from '../../../../../orders/store/selectors'
import {CargoFormInterface} from '../../types/cargo-form.interface'

@Component({
  selector: 'app-cargo',
  templateUrl: './cargo.component.html',
  styleUrls: ['./cargo.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: CargoComponent,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: CargoComponent,
      multi: true,
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CargoComponent implements OnInit {
  cargoTypes$: Observable<CargoInterface[]>

  onTouched = () => {}
  onChangeSub: Subscription

  form = this.fb.group<CargoFormInterface>({
    type: null,
    value: null,
  })

  constructor(private fb: FormBuilder, private store: Store) {}

  ngOnInit(): void {
    // this.form.updateValueAndValidity()
    this.initializeValues()
  }

  ngOnDestroy() {
    if (this.onChangeSub) {
      this.onChangeSub.unsubscribe()
    }
  }

  initializeValues(): void {
    this.cargoTypes$ = this.store.select(allCargosSelector).pipe(
      switchMap((cargos: CargoInterface[]) => {
        return of(cargos).pipe(
          concatAll(),
          filter((cargo: CargoInterface) => cargo.parent_id === '0'),
          toArray(),
          tap((types: CargoInterface[]) => {
            // this.form.get('type').patchValue(types[0])
          })
        )
      })
    )
  }

  changeCargoType($event: any) {
    console.log('$event', $event)
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
