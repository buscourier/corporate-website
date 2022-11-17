import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
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
import {TUI_VALIDATION_ERRORS} from '@taiga-ui/kit'
import {combineLatest, Observable, Subscription} from 'rxjs'
import {tap} from 'rxjs/operators'
import {EndCityInterface} from 'src/app/shared/types/end-city.interface'
import {OfficeInterface} from '../../../../../../../../shared/types/office.interface'
import {CourierInterface} from '../../../../../../types/courier.interface'
import {
  endCitySelector,
  endCourierSelector,
  endOfficeSelector,
} from '../../../../../end-point/store/selectors'
import {
  startCourierSelector,
  startOfficeSelector,
} from '../../../../../start-point/store/selectors'
import {ParcelFormInterface} from '../../types/parcel-form.interface'

interface CityLimitInterface {
  name: string
  maxWeight?: number
  maxDimensionsSum?: number
}

enum VladivostokOffice {
  RUSSKAYA = '1',
  ALEUTSKAYA = '1249',
  GOGOLYA = '249',
}

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
        weight: (error) => {
          return `Максимальный вес посылки ${error.max} кг.`
        },
      },
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ParcelComponent implements OnInit, OnDestroy {
  endCity$: Observable<EndCityInterface>
  startOffice$: Observable<OfficeInterface>
  startCourier$: Observable<CourierInterface>
  endOffice$: Observable<OfficeInterface>
  endCourier$: Observable<CourierInterface>
  combineAllSub: Subscription

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
  private maxWeight = 100
  private citiesLimit = {
    ['1675, 1885, 414, 1756, 1615, 1775, 1932']: {
      name: 'Ванино',
      maxWeight: 20,
      maxDimensionsSum: 130,
    },
    ['1676, 1888, 1759, 1824, 1933']: {
      name: 'Cов. Гавань',
      maxWeight: 20,
      maxDimensionsSum: 130,
    },
    ['754, 192, 4, 12, 1783, 101']: {name: 'Дальнегорск', maxWeight: 40},
    ['1627, 207, 30, 235, 119, 1808, 180']: {name: 'Ольга', maxWeight: 50},
  }

  constructor(private fb: FormBuilder, private store: Store) {}

  ngOnInit(): void {
    this.form.setValidators(Validators.required)
    this.initializeValues()
  }

  ngOnDestroy() {
    this.combineAllSub.unsubscribe()
  }

  initializeValues() {
    this.combineAllSub = combineLatest([
      this.store.select(endCitySelector),
      this.store.select(startOfficeSelector),
      this.store.select(startCourierSelector),
      this.store.select(endOfficeSelector),
      this.store.select(endCourierSelector),
    ])
      .pipe(
        tap(([endCity, startOffice, startCourier, endOffice, endCourier]) => {
          const limitWeight = 20
          const limitDimensionsSum = 130
          let cityLimit = null
          let startOfficeLimit = false
          let endOfficeLimit = false

          if (endCity) {
            cityLimit = this.getCityLimit(endCity.id)
          }

          if (startOffice) {
            startOfficeLimit =
              startOffice.office_id === VladivostokOffice.RUSSKAYA ||
              startOffice.office_id === VladivostokOffice.ALEUTSKAYA ||
              startOffice.office_id === VladivostokOffice.GOGOLYA
          }

          if (endOffice) {
            endOfficeLimit =
              endOffice.office_id === VladivostokOffice.RUSSKAYA ||
              endOffice.office_id === VladivostokOffice.ALEUTSKAYA ||
              endOffice.office_id === VladivostokOffice.GOGOLYA
          }

          if (cityLimit) {
            this.maxWeight = cityLimit.maxWeight || this.maxWeight
            this.maxDimensionsSum =
              cityLimit.maxDimensionsSum || this.maxDimensionsSum
          } else if (
            startOfficeLimit ||
            endOfficeLimit ||
            startCourier ||
            endCourier
          ) {
            this.maxWeight = limitWeight
            this.maxDimensionsSum = limitDimensionsSum
          }
        })
      )
      .subscribe()
  }

  getCityLimit(id): CityLimitInterface {
    const result = Object.entries(this.citiesLimit).filter(([ids, data]) => {
      return ids.split(', ').indexOf(id) !== -1
    })

    return result.length ? result[0][1] : null
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
    const fields = Object.assign({}, this.form.value)

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

  weightError(): ValidationErrors | null {
    const {weight} = this.form.value

    const error = Number(weight) > this.maxWeight

    if (error) {
      this.form.setErrors({weight: {error: true, max: this.maxWeight}})
      return {weight: true}
    } else {
      return null
    }
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

  validate(): ValidationErrors | null {
    return this.requiredError() || this.weightError() || this.dimensionsError()
  }
}
