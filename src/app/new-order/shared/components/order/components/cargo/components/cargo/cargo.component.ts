import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core'
import {
  FormBuilder,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ValidationErrors,
} from '@angular/forms'
import {Store} from '@ngrx/store'
import {filter, map, Observable, of, Subscription, switchMap} from 'rxjs'
import {concatAll, tap, toArray} from 'rxjs/operators'
import {CargoInterface} from '../../../../../../types/cargo.interface'
import {allCargosSelector} from '../../../../../orders/store/selectors'

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

  active = this.fb.control(null)
  docs = this.fb.control({value: null, disabled: true})
  parcels = this.fb.control({value: null, disabled: true})
  auto = this.fb.control({value: null, disabled: true})
  other = this.fb.control({value: null, disabled: true})

  form = this.fb.group({
    active: this.active,
    docs: this.docs,
    parcels: this.parcels,
    auto: this.auto,
    other: this.other,
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
          map((cargo: CargoInterface) => {
            if (cargo.id === '1') {
              return {
                ...cargo,
                name: 'Документы',
              }
            } else {
              return cargo
            }
          }),
          toArray(),
          tap((types: CargoInterface[]) => {
            if (!this.active.value) {
              const docs = types[0]

              this.active.setValue(docs)
              this.changeCargoType()
            }
          })
        )
      })
    )
  }

  changeCargoType() {
    switch (this.active.value.id) {
      case '1':
        this.docs.enable()
        this.parcels.disable()
        this.auto.disable()
        this.other.disable()
        break
      case '2':
        this.parcels.enable()
        this.docs.disable()
        this.auto.disable()
        this.other.disable()
        break
      case '5':
        this.auto.enable()
        this.parcels.disable()
        this.docs.disable()
        this.other.disable()
        break
      case '21':
        this.other.enable()
        this.auto.disable()
        this.parcels.disable()
        this.docs.disable()
        break
    }
  }

  writeValue(value: any) {
    if (value) {
      this.form.patchValue(value)
      this.changeCargoType()
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

  invalid(): ValidationErrors | null {
    const invalid =
      this.docs.invalid ||
      this.parcels.invalid ||
      this.auto.invalid ||
      this.other.invalid

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
