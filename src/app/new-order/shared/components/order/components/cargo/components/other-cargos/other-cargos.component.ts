import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core'
import {
  FormBuilder,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ValidationErrors,
  Validators,
} from '@angular/forms'
import {Store} from '@ngrx/store'
import {TUI_VALIDATION_ERRORS, tuiItemsHandlersProvider} from '@taiga-ui/kit'
import {combineLatest, Observable, of, Subscription} from 'rxjs'
import {concatAll, filter, switchMap, tap, toArray} from 'rxjs/operators'
import {STRINGIFY_CARGOS} from '../../../../../../../../shared/handlers/string-handlers'
import {CargoInterface} from '../../../../../../types/cargo.interface'
import {
  endCourierSelector,
  endOfficeSelector,
} from '../../../../../end-point/store/selectors'
import {allCargosSelector} from '../../../../../orders/store/selectors'
import {
  startCourierSelector,
  startOfficeSelector,
} from '../../../../../start-point/store/selectors'
import {VladivostokOffice} from '../../../../enums/vladivostokOffice'

@Component({
  selector: 'app-other-cargos',
  templateUrl: './other-cargos.component.html',
  styleUrls: ['./other-cargos.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: OtherCargosComponent,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: OtherCargosComponent,
      multi: true,
    },
    {
      provide: TUI_VALIDATION_ERRORS,
      useValue: {
        startOffice: `Из выбранного офиса габаритные посылки не отправляются`,
        endOffice: `Выбранный офис габаритные посылки не принимает`,
        courier: `Доставка габаритные посылкок курьером невозможна`,
      },
    },
    tuiItemsHandlersProvider({stringify: STRINGIFY_CARGOS}),
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OtherCargosComponent implements OnInit {
  cargos$: Observable<CargoInterface[]>
  combineAllSub: Subscription

  onTouched = () => {}
  onChangeSub: Subscription
  detailChangedSub: Subscription

  detail = this.fb.control(null, [Validators.required])
  places = this.fb.control(1, [Validators.required])

  form = this.fb.group({
    detail: this.detail,
    places: this.places,
  })

  startOfficeLimits = false
  endOfficeLimits = false
  courierLimits = false

  constructor(
    private fb: FormBuilder,
    private store: Store,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.initializeValues()
  }

  ngOnDestroy() {
    this.detailChangedSub.unsubscribe()
    this.combineAllSub.unsubscribe()
  }

  initializeValues() {
    this.places.disable()
    this.cargos$ = this.store.select(allCargosSelector).pipe(
      switchMap((cargos: CargoInterface[]) => {
        return of(cargos).pipe(
          concatAll(),
          filter((cargo: CargoInterface) => cargo.parent_id === '21'),
          toArray()
        )
      })
    )

    this.detailChangedSub = this.detail.valueChanges
      .pipe(
        tap((value) => {
          if (value) {
            this.places.enable()
            // this.detail.disable({emitEvent: false})
          }
        })
      )
      .subscribe()

    this.combineAllSub = combineLatest([
      this.store.select(startOfficeSelector),
      this.store.select(startCourierSelector),
      this.store.select(endOfficeSelector),
      this.store.select(endCourierSelector),
    ])
      .pipe(
        tap(([startOffice, startCourier, endOffice, endCourier]) => {
          this.startOfficeLimits =
            startOffice &&
            (startOffice.home_id === VladivostokOffice.ALEUTSKAYA ||
              startOffice.home_id === VladivostokOffice.GOGOLYA)

          this.endOfficeLimits =
            endOffice &&
            (endOffice.home_id === VladivostokOffice.ALEUTSKAYA ||
              endOffice.home_id === VladivostokOffice.GOGOLYA)

          this.courierLimits = !!(startCourier || endCourier)
        })
      )
      .subscribe(() => {
        this.form.updateValueAndValidity()
        this.form.markAsTouched()
        this.cdr.markForCheck()
      })
  }

  delete() {
    this.form.setValue({
      detail: null,
      places: 1,
    })

    this.places.disable()
    this.detail.enable()
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

  startOfficeError(): ValidationErrors | null {
    const error = this.startOfficeLimits

    if (error) {
      this.form.setErrors({startOffice: true})
      this.detail.disable({onlySelf: true, emitEvent: false})
      this.places.disable({onlySelf: true, emitEvent: false})
      return {startOffice: true}
    } else {
      this.detail.enable({onlySelf: true, emitEvent: false})
      this.places.enable({onlySelf: true, emitEvent: false})
      return null
    }
  }

  endOfficeError(): ValidationErrors | null {
    const error = this.endOfficeLimits

    if (error) {
      this.form.setErrors({endOffice: true})
      this.detail.disable({onlySelf: true, emitEvent: false})
      this.places.disable({onlySelf: true, emitEvent: false})
      return {endOffice: true}
    } else {
      this.detail.enable({onlySelf: true, emitEvent: false})
      this.places.enable({onlySelf: true, emitEvent: false})
      return null
    }
  }

  courierError(): ValidationErrors | null {
    const error = this.courierLimits

    if (error) {
      this.form.setErrors({courier: true})
      this.detail.disable({onlySelf: true, emitEvent: false})
      this.places.disable({onlySelf: true, emitEvent: false})
      return {courier: true}
    } else {
      this.detail.enable({onlySelf: true, emitEvent: false})
      this.places.enable({onlySelf: true, emitEvent: false})
      return null
    }
  }

  validate(): ValidationErrors | null {
    return (
      this.startOfficeError() || this.endOfficeError() || this.courierError()
    )
  }
}
