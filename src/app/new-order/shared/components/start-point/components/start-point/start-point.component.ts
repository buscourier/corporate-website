import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core'
import {FormBuilder, Validators} from '@angular/forms'
import {Store} from '@ngrx/store'
import {TuiDay} from '@taiga-ui/cdk'
import {TUI_VALIDATION_ERRORS, tuiItemsHandlersProvider} from '@taiga-ui/kit'
import {filter, first, map, Observable, of, switchMap, using} from 'rxjs'
import {concatAll, tap} from 'rxjs/operators'
import {STRINGIFY_CITIES} from '../../../../../../shared/handlers/string-handlers'
import {OfficeInterface} from '../../../../../../shared/types/office.interface'
import {StartCityInterface} from '../../../../../../shared/types/start-city.interface'
import {CourierInterface} from '../../../../types/courier.interface'
import {courierValueChangesAction} from '../../store/actions/courier-value-changes.action'
import {getCitiesAction} from '../../store/actions/get-cities.action'
import {getOfficesAction} from '../../store/actions/get-offices.action'
import {setActiveTabAction} from '../../store/actions/set-active-tab.action'
import {setCityAction} from '../../store/actions/set-city.action'
import {setDateAction} from '../../store/actions/set-date.action'
import {setOfficeAction} from '../../store/actions/set-office.action'
import {
  activeTabSelector,
  citiesSelector,
  citySelector,
  courierSelector,
  dateSelector,
  isCitiesLoadedSelector,
  isCitiesLoadingSelector,
  isOfficesLoadingSelector,
  officeSelector,
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
  activeTabIndex$: Observable<number>

  city = this.fb.control(null, [Validators.required])
  give = this.fb.control(null, [Validators.required])
  date = this.fb.control(null, [Validators.required])
  pickup = this.fb.group({
    street: ['', [Validators.required]],
    building: ['', [Validators.required]],
    apartment: ['', [Validators.required]],
    time: ['', [Validators.required]],
  })

  cityValues$ = using(
    () =>
      this.city.valueChanges
        .pipe(
          tap((city: StartCityInterface) => {
            if (city) {
              this.store.dispatch(setCityAction({city}))
              this.store.dispatch(getOfficesAction({id: city.office_id}))
              // this.activeTabIndex = -1
            }
          })
        )
        .subscribe(),
    () => this.store.select(citySelector)
  )

  giveValues$ = using(
    () =>
      this.give.valueChanges
        .pipe(
          tap((give: OfficeInterface) => {
            if (give) {
              this.store.dispatch(setOfficeAction({give}))
            }
          })
        )
        .subscribe(),
    () => this.store.select(officeSelector)
  )

  dateValues$ = using(
    () =>
      this.date.valueChanges
        .pipe(
          tap((date: TuiDay) => {
            this.store.dispatch(setDateAction({date}))
          })
        )
        .subscribe(),
    () => this.store.select(dateSelector)
  )

  pickupValues$ = using(
    () =>
      this.pickup.valueChanges
        .pipe(
          tap((pickup: CourierInterface) => {
            this.store.dispatch(courierValueChangesAction({pickup}))
          })
        )
        .subscribe(),
    () => this.store.select(courierSelector)
  )

  form = this.fb.group({
    city: this.city,
    give: this.give,
    pickup: this.pickup,
    date: this.date,
  })

  tabs: string[]

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

    this.activeTabIndex$ = this.store.select(activeTabSelector)

    this.offices$ = this.store.select(officesSelector).pipe(
      tap((offices: OfficeInterface[]) => {
        // if (offices.length < 2) {
        //   this.give.patchValue(offices[0])
        // }
        // this.form.get('give').setValue(offices[0]) //TODO consider another way to set default office
        this.createTabControls(offices)
      })
    )

    this.city.disable()
    this.setActiveTabIndex(0)
    this.form.get('date').setValue(this.setCurrentDate())
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
      })
  }

  setCurrentDate() {
    const date = new Date()
    return new TuiDay(date.getFullYear(), date.getMonth(), date.getDate())
  }

  setActiveTabIndex(index: number) {
    this.store.dispatch(setActiveTabAction({activeTabIndex: index}))

    switch (index) {
      case 0:
        this.give.enable()
        this.pickup.disable()
        this.store.dispatch(courierValueChangesAction({pickup: null}))
        break
      case 1:
        this.pickup.enable()
        this.give.disable()
        this.store.dispatch(setOfficeAction({give: null}))
        break
    }
  }
}
