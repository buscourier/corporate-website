import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  Injector,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core'
import {FormBuilder, Validators} from '@angular/forms'
import {Store} from '@ngrx/store'
import {TuiDay} from '@taiga-ui/cdk'
import {TuiDialogService} from '@taiga-ui/core'
import {TUI_VALIDATION_ERRORS, tuiItemsHandlersProvider} from '@taiga-ui/kit'
import {PolymorpheusComponent} from '@tinkoff/ng-polymorpheus'
import {
  combineLatest,
  debounceTime,
  filter,
  first,
  map,
  Observable,
  of,
  pairwise,
  Subscription,
  switchMap,
  take,
  using,
} from 'rxjs'
import {concatAll, tap} from 'rxjs/operators'
import {ModalMapComponent} from '../../../../../../shared/components/modal-map/modal-map.component'
import {STRINGIFY_CITIES} from '../../../../../../shared/handlers/string-handlers'
import {OfficeInterface} from '../../../../../../shared/types/office.interface'
import {StartCityInterface} from '../../../../../../shared/types/start-city.interface'
import {CourierInterface} from '../../../../types/courier.interface'
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
  isStartPointPristineSelector,
  officesSelector,
  startCitySelector,
  startCourierSelector,
  startOfficeSelector,
  tabsSelector,
} from '../../store/selectors'
import {initialState} from '../../store/state'
import {UtilsService} from '../../../../../../shared/services/utils.service'

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
  @Input() boldCityLabel: boolean

  isCitiesLoading$: Observable<boolean>
  isCitiesLoaded$: Observable<boolean>
  isOfficesLoading$: Observable<boolean>
  cities$: Observable<StartCityInterface[]>
  offices$: Observable<OfficeInterface[]>
  backendErrors$: Observable<string | null>
  tabs$: Observable<any>
  activeTab$: Observable<string>

  readonly timeRange = ['8.00 - 14.00', '14.00 - 18.00']

  city = this.fb.control(null, [Validators.required])
  give = this.fb.control(null, [Validators.required])
  date = this.fb.control(initialState.date, [Validators.required])
  pickup = this.fb.control(null, [Validators.required])

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
            this.store.dispatch(changeOfficeAction({give}))
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
          pairwise(),
          tap(([prev, next]) => {
            if (prev === null || next === null) {
              this.store.dispatch(changeCourierAction({pickup: null}))
            } else if (!this.utils.isObjectsEqual(prev, next)) {
              this.store.dispatch(changeCourierAction({pickup: next}))
            }
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
  isStartPointPristineSub: Subscription

  tabs: string[]

  readonly TabName = {
    give: 'Сдать в отделение',
    pickup: 'Вызвать курьера',
  }

  constructor(
    private fb: FormBuilder,
    private store: Store,
    @Inject(TuiDialogService) private readonly dialogService: TuiDialogService,
    @Inject(Injector) private readonly injector: Injector,
    private utils: UtilsService
  ) {}

  ngOnInit(): void {
    this.fetchData()
    this.initializeValues()
  }

  ngOnDestroy() {
    this.formValuesSub.unsubscribe()

    if (this.isStartPointPristineSub) {
      this.isStartPointPristineSub.unsubscribe()
    }
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

    this.activeTab$ = this.store.select(activeTabSelector).pipe(
      tap((tab: string) => {
        switch (tab) {
          case 'give':
            this.give.enable()
            this.pickup.setValue(null)
            this.pickup.disable()
            break
          case 'pickup':
            this.pickup.enable()
            this.give.setValue(null)
            this.give.disable()
            break
        }
      })
    )

    this.offices$ = combineLatest([
      this.store.select(officesSelector),
      this.store.select(startOfficeSelector),
    ]).pipe(
      tap(([offices, activeOffice]: [OfficeInterface[], OfficeInterface]) => {
        if (activeOffice === null && this.give.enabled) {
          this.give.setValue(offices[0])
        }
      }),
      map(([offices]: [OfficeInterface[], OfficeInterface]) => {
        return offices
      })
    )

    this.tabs$ = combineLatest([
      this.store.select(tabsSelector),
      this.store.select(activeTabSelector),
    ]).pipe(
      switchMap(([offices, activeTab]) => {
        const tabs = (offices || []).map((office: OfficeInterface) => {
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
        })

        return of([tabs, activeTab])
      }),
      map(([tabsArray, activeTab]: [any, string]) => {
        const tabs = tabsArray.length ? tabsArray[0] : []

        const isActiveTabExists = tabs.find((tab: string) => tab === activeTab)

        if (activeTab && isActiveTabExists) {
          this.setActiveTab(activeTab)
        } else {
          this.setActiveTab(tabs[0])
        }

        return tabs
      })
    )

    this.city.disable()

    this.formValuesSub = this.form.valueChanges
      .pipe(
        debounceTime(500),
        tap(() => {
          this.store.dispatch(changeValidityAction({isValid: this.form.valid}))
        })
      )
      .subscribe()

    this.isStartPointPristineSub = this.store
      .select(isStartPointPristineSelector)
      .pipe(
        tap((isPristine: boolean) => {
          if (isPristine) {
            this.form.reset()
            this.date.setValue(this.setCurrentDate())
          }
        })
      )
      .subscribe()
  }

  setActiveTab(activeTab: string) {
    this.store.dispatch(changeActiveTabAction({activeTab}))
  }

  setCurrentDate = () => {
    const date = new Date()
    return new TuiDay(date.getFullYear(), date.getMonth(), date.getDate())
  }

  showMap() {
    const office: OfficeInterface = this.give.value

    if (!office) {
      return
    }

    this.dialogService
      .open<any>(new PolymorpheusComponent(ModalMapComponent, this.injector), {
        data: {
          address: office.address,
          points: [office],
        },
        dismissible: true,
        closeable: false,
        size: 'fullscreen',
      })
      .pipe(take(1))
      .subscribe()
  }
}
