import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core'
import {FormBuilder, Validators} from '@angular/forms'
import {Store} from '@ngrx/store'
import {TuiDay} from '@taiga-ui/cdk'
import {TUI_VALIDATION_ERRORS, tuiItemsHandlersProvider} from '@taiga-ui/kit'
import {
  debounceTime,
  filter,
  first,
  map,
  Observable,
  of,
  Subscription,
  switchMap,
  using,
} from 'rxjs'
import {concatAll, tap} from 'rxjs/operators'
import {STRINGIFY_CITIES} from '../../../../../../shared/handlers/string-handlers'
import {OfficeInterface} from '../../../../../../shared/types/office.interface'
import {StartCityInterface} from '../../../../../../shared/types/start-city.interface'
import {CourierInterface} from '../../../../types/courier.interface'
import {resetOrdersAction} from '../../../orders/store/actions/reset-orders.action'
import {changeActiveTabAction} from '../../store/actions/change-active-tab.action'
import {changeCityAction} from '../../store/actions/change-city.action'
import {changeCourierAction} from '../../store/actions/change-courier.action'
import {changeDateAction} from '../../store/actions/change-date.action'
import {changeOfficeAction} from '../../store/actions/change-office.action'
import {changeValidityAction} from '../../store/actions/change-validity.action'
import {getCitiesAction} from '../../store/actions/get-cities.action'
import {getOfficesAction} from '../../store/actions/get-offices.action'
import {
  activeTabSelector,
  citiesSelector,
  dateSelector,
  isCitiesLoadedSelector,
  isCitiesLoadingSelector,
  isOfficesLoadingSelector,
  officesSelector,
  startCitySelector,
  startCourierSelector,
  startOfficeSelector,
} from '../../store/selectors'
import {initialState} from '../../store/state'

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
export class StartPointComponent implements OnInit, OnDestroy {
  isCitiesLoading$: Observable<boolean>
  isCitiesLoaded$: Observable<boolean>
  isOfficesLoading$: Observable<boolean>
  cities$: Observable<StartCityInterface[]>
  offices$: Observable<OfficeInterface[]>
  backendErrors$: Observable<string | null>
  activeTabIndex$: Observable<number>

  readonly timeRange = ['8.00 - 14.00', '14.00 - 18.00']

  city = this.fb.control(null, [Validators.required])
  give = this.fb.control(null, [Validators.required])
  date = this.fb.control(initialState.date, [Validators.required])
  pickup = this.fb.group({
    street: ['', [Validators.required]],
    building: ['', [Validators.required]],
    apartment: ['', [Validators.required]],
    time: [this.timeRange[0], [Validators.required]],
  })

  cityValues$ = using(
    () =>
      this.city.valueChanges
        .pipe(
          tap((city: StartCityInterface) => {
            if (city) {
              //TODO: Check is that way correct, maybe need switch to map
              this.store.dispatch(changeCityAction({city}))
              this.store.dispatch(getOfficesAction({id: city.office_id}))
            }
          })
        )
        .subscribe(),
    () => this.store.select(startCitySelector)
  )

  giveValues$ = using(
    () =>
      this.give.valueChanges
        .pipe(
          tap((give: OfficeInterface) => {
            if (give) {
              this.store.dispatch(changeOfficeAction({give}))
            }
          })
        )
        .subscribe(),
    () => this.store.select(startOfficeSelector)
  )

  dateValues$ = using(
    () =>
      this.date.valueChanges
        .pipe(
          tap((date: TuiDay) => {
            this.store.dispatch(changeDateAction({date}))
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
            this.store.dispatch(changeCourierAction({pickup}))
          })
        )
        .subscribe(),
    () => this.store.select(startCourierSelector)
  )

  form = this.fb.group({
    city: this.city,
    give: this.give,
    pickup: this.pickup,
    date: this.date,
  })

  formValuesSub: Subscription

  tabs: string[]

  readonly TabName = {
    give: 'Сдать в отделение',
    pickup: 'Вызвать курьера',
  }

  constructor(private fb: FormBuilder, private store: Store) {}

  ngOnInit(): void {
    this.fetchData()
    this.initializeValues()
  }

  ngOnDestroy() {
    this.formValuesSub.unsubscribe()
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
      tap(() => {
        this.city.enable()
      })
    )

    this.activeTabIndex$ = this.store.select(activeTabSelector).pipe(
      tap((index: number) => {
        switch (index) {
          case 0:
            this.give.enable()
            this.pickup.disable()
            this.store.dispatch(changeCourierAction({pickup: null}))
            break
          case 1:
            this.pickup.enable()
            this.give.disable()

            setTimeout(() => {
              this.pickup.patchValue({
                street: '',
              })
            }, 0),
              this.store.dispatch(changeOfficeAction({give: null}))
            break
        }
      })
    )

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
    // this.setActiveTabIndex(0)

    this.formValuesSub = this.form.valueChanges
      .pipe(
        debounceTime(500),
        tap(() => {
          this.store.dispatch(changeValidityAction({isValid: this.form.valid}))
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
        //TODO: fix error in start-point

        // EmptyErrorImpl {stack: 'Error\n    at _super (http://localhost:4200/vendor.…mplete
        // (http://localhost:4200/vendor.js:31023:12)',
        // name: 'EmptyError', message: 'no elements in sequence'}

        this.tabs = tabs
      })
  }

  setActiveTabIndex(index: number) {
    this.store.dispatch(changeActiveTabAction({activeTabIndex: index}))
  }

  resetForm() {
    console.log('thiiiis', this.city.value)

    if (this.city.value) {
      this.store.dispatch(resetOrdersAction())
    }
  }
}
