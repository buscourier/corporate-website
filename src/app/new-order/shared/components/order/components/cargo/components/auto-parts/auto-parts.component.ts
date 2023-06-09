import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Inject,
  OnInit,
  Self,
} from '@angular/core'
import {
  FormBuilder,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ValidationErrors,
  Validators,
} from '@angular/forms'
import {Store} from '@ngrx/store'
import {TuiDestroyService} from '@taiga-ui/cdk'
import {TUI_VALIDATION_ERRORS, tuiItemsHandlersProvider} from '@taiga-ui/kit'
import {combineLatest, delay, Observable, of, takeUntil} from 'rxjs'
import {concatAll, filter, switchMap, tap, toArray} from 'rxjs/operators'
import {CargoInterface} from 'src/app/new-order/shared/types/cargo.interface'
import {STRINGIFY_CARGOS} from '../../../../../../../../shared/handlers/string-handlers'
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
  selector: 'app-auto-parts',
  templateUrl: './auto-parts.component.html',
  styleUrls: ['./auto-parts.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: AutoPartsComponent,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: AutoPartsComponent,
      multi: true,
    },
    {
      provide: TUI_VALIDATION_ERRORS,
      useValue: {
        required: `Поле обязательно для заполнения`,
        startOffice: `Из выбранного офиса  автозапчасти не отправляются`,
        endOffice: `Выбранный офис автозапчасти не принимает`,
        courier: `Доставка запчастей курьером невозможна`,
      },
    },
    tuiItemsHandlersProvider({stringify: STRINGIFY_CARGOS}),
    TuiDestroyService,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AutoPartsComponent implements OnInit {
  cargos$: Observable<CargoInterface[]>

  onTouched = () => {}

  detail = this.fb.control(null, [Validators.required])
  places = this.fb.control({value: 1, disabled: true}, [
    Validators.required,
    Validators.min(1),
  ])

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
    private cdr: ChangeDetectorRef,
    @Self() @Inject(TuiDestroyService) private destroy$: TuiDestroyService
  ) {}

  ngOnInit(): void {
    this.initializeValues()
  }

  initializeValues() {
    this.places.disable()
    this.cargos$ = this.store.select(allCargosSelector).pipe(
      switchMap((cargos: CargoInterface[]) => {
        return of(cargos).pipe(
          concatAll(),
          filter((cargo: CargoInterface) => cargo.parent_id === '5'),
          toArray(),
          tap((cargos: CargoInterface[]) => {
            if (!this.detail.value) {
              this.detail.setValue(cargos[0])
            }
          })
        )
      })
    )

    this.detail.valueChanges
      .pipe(
        tap((value) => {
          if (value) {
            this.places.enable()
            // this.detail.disable({emitEvent: false})
          }
        }),
        takeUntil(this.destroy$)
      )
      .subscribe()

    combineLatest([
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
        }),
        delay(0), //TODO: this operator fix message showing
        takeUntil(this.destroy$)
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
    this.form.valueChanges.pipe(takeUntil(this.destroy$)).subscribe(onChange)
  }

  setDisabledState(disabled: boolean) {
    if (disabled) {
      this.form.disable()
    } else {
      this.form.enable()
    }
  }

  requiredError(): ValidationErrors | null {
    const error = this.detail.errors && this.detail.errors['required']

    if (error) {
      this.form.setErrors({required: true})
      return {required: true}
    } else {
      return null
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
      this.requiredError() ||
      this.startOfficeError() ||
      this.endOfficeError() ||
      this.courierError()
    )
  }
}
