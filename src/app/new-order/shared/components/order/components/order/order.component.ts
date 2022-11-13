import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core'
import {
  AbstractControl,
  FormBuilder,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ValidationErrors,
} from '@angular/forms'
import {Store} from '@ngrx/store'
import {filter, Observable, of, Subscription, switchMap} from 'rxjs'
import {concatAll, toArray} from 'rxjs/operators'
import {CargoInterface} from '../../../../types/cargo.interface'
import {allCargosSelector} from '../../../orders/store/selectors'

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: OrderComponent,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: OrderComponent,
      multi: true,
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrderComponent implements OnInit, OnDestroy {
  cargoTypes$: Observable<CargoInterface[]>

  onTouched = () => {}
  onChangeSub: Subscription

  form = this.fb.group({
    activeCargoType: null,
    cargo: '',
    packages: [],
    services: [],
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
          toArray()
        )
      })
    )
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

  changeCargoType($event: any) {
    console.log('$event', $event)
  }
}
