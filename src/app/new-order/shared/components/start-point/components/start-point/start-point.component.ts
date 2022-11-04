import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core'
import {FormBuilder} from '@angular/forms'
import {Store} from '@ngrx/store'
import {TuiDay} from '@taiga-ui/cdk'
import {TUI_VALIDATION_ERRORS, tuiItemsHandlersProvider} from '@taiga-ui/kit'
import {filter, first, map, Observable, of, switchMap} from 'rxjs'
import {concatAll, tap} from 'rxjs/operators'
import {STRINGIFY_CITIES} from '../../../../../../shared/handlers/string-handlers'
import {OfficeInterface} from '../../../../../../shared/types/office.interface'
import {StartCityInterface} from '../../../../../../shared/types/start-city.interface'
import {CourierInterface} from '../../../../types/courier.interface'
import {getCitiesAction} from '../../store/actions/get-cities.action'
import {getOfficesAction} from '../../store/actions/get-offices.action'
import {setCityAction} from '../../store/actions/set-city.action'
import {
  citiesSelector,
  citySelector,
  isCitiesLoadedSelector,
  isCitiesLoadingSelector,
  isOfficesLoadingSelector,
  officesSelector,
} from '../../store/selectors'

@Component({
  selector: 'app-start-point',
  templateUrl: './start-point.component.html',
  styleUrls: ['./start-point.component.css'],
  providers: [
    tuiItemsHandlersProvider({stringify: STRINGIFY_CITIES}),
    {
      provide: TUI_VALIDATION_ERRORS,
      useValue: {
        required: `Поле обязательно для заполнения`,
        email: `Укажите корректный email`,
      },
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StartPointComponent implements OnInit {
  isCitiesLoading$: Observable<boolean>
  isCitiesLoaded$: Observable<boolean>
  isOfficesLoading$: Observable<boolean>
  cities$: Observable<StartCityInterface[]>
  offices$: Observable<OfficeInterface[]>
  backendErrors$: Observable<string | null>

  form = this.fb.group({
    city: [{value: null, disabled: true}],
    give: null,
    pickup: this.fb.group<CourierInterface>({
      street: '',
      building: '',
      apartment: '',
      time: '',
    }),
    date: this.setCurrentDate(),
  })

  tabs: string[]
  activeTabIndex = -1

  readonly TabName = {
    give: 'Сдать в отделение',
    pickup: 'Вызвать курьера',
  }

  readonly timeRange = [{range: '8.00 - 14.00'}, {range: '14.00 - 18.00'}]

  constructor(private fb: FormBuilder, private store: Store) {}

  ngOnInit(): void {
    this.fetchData()
    this.initializeValues()
  }

  fetchData() {
    this.store
      .select(isCitiesLoadedSelector)
      .pipe(
        tap((is) => console.log('is', is)),
        filter((isCitiesLoaded: boolean) => !isCitiesLoaded),
        tap(() => this.store.dispatch(getCitiesAction()))
      )
      .subscribe()
  }

  initializeValues() {
    this.isCitiesLoading$ = this.store.select(isCitiesLoadingSelector)
    this.isOfficesLoading$ = this.store.select(isOfficesLoadingSelector)
    this.cities$ = this.store.select(citiesSelector).pipe(
      filter(Boolean),
      tap((cities: StartCityInterface[]) => {
        this.form.get('city').enable()
      })
    )

    this.offices$ = this.store.select(officesSelector).pipe(
      tap((offices: OfficeInterface[]) => {
        this.form.get('give').setValue(offices[0]) //TODO consider another way to set default office
        this.createTabControls(offices)
      })
    )

    this.store.select(citySelector).pipe(
      filter(Boolean),
      tap((city: StartCityInterface) => {
        this.form.get('city').patchValue(city)
      })
    )

    this.form
      .get('city')
      .valueChanges.pipe(
        tap((city: StartCityInterface | null) => {
          if (city) {
            this.store.dispatch(setCityAction({city}))
            this.store.dispatch(getOfficesAction({id: city.office_id}))
            this.activeTabIndex = -1
          }
        })
      )
      .subscribe()

    this.form
      .get('give')
      .valueChanges.pipe(
        tap((give: OfficeInterface) => {
          if (give) {
            // this.store.dispatch(setOfficeAction({give}))
          }
        })
      )
      .subscribe()
  }

  createTabControls(offices: OfficeInterface[]) {
    return of(offices)
      .pipe(
        switchMap((offices: OfficeInterface[]) =>
          of(offices).pipe(
            concatAll(),
            map((office: OfficeInterface) => {
              return Object.entries(office)
                .filter((item: [string, string]) => {
                  return (
                    (item[0] === 'give' && item[1] === '1') ||
                    (item[0] === 'pickup' && item[1] === '1')
                  )
                })
                .map((item: [string, any]) => {
                  return item[0]
                })
            }),
            first()
          )
        )
      )
      .subscribe((tabs: Array<string>) => {
        this.tabs = tabs
        this.activeTabIndex = 0
      })
  }

  setCurrentDate() {
    const date = new Date()
    return new TuiDay(date.getFullYear(), date.getMonth(), date.getDate())
  }

  onSubmit() {
    console.log('this.form.value', this.form.value)
  }
}
