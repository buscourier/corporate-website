import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  Injector,
  Input,
  OnInit,
  Self,
} from '@angular/core'
import {FormBuilder, Validators} from '@angular/forms'
import {Store} from '@ngrx/store'
import {TuiDay, TuiDestroyService} from '@taiga-ui/cdk'
import {TuiDialogService} from '@taiga-ui/core'
import {TUI_VALIDATION_ERRORS, tuiItemsHandlersProvider} from '@taiga-ui/kit'
import {PolymorpheusComponent} from '@tinkoff/ng-polymorpheus'
import {
  combineLatest,
  debounceTime,
  filter,
  map,
  Observable,
  of,
  pairwise,
  switchMap,
  take,
  takeUntil,
  using,
} from 'rxjs'
import {tap} from 'rxjs/operators'
import {ModalMapComponent} from '../../../../../../shared/components/modal-map/modal-map.component'
import {STRINGIFY_CITIES} from '../../../../../../shared/handlers/string-handlers'
import {UtilsService} from '../../../../../../shared/services/utils.service'
import {OfficeInterface} from '../../../../../../shared/types/office.interface'
import {StartCityInterface} from '../../../../../../shared/types/start-city.interface'
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
    TuiDestroyService,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StartPointComponent implements OnInit {
  @Input() boldCityLabel: boolean
  @Input('reset') resetProps = false

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
          filter(Boolean),
          tap(() => {
            if (this.resetProps && !this.form.pristine) {
              this.reset()
            }
          }),
          switchMap((city: StartCityInterface) => {
            this.store.dispatch(changeCityAction({city}))

            return of(city).pipe(
              tap((city: StartCityInterface) => {
                this.store.dispatch(getOfficesAction({id: city.office_id}))
              })
            )
          })
          // delay(0),
          // tap(() => {
          //   this.give.setValue(null)
          // })
        )
        .subscribe(),
    () => this.store.select(startCitySelector)
  )

  giveValues$ = using(
    () =>
      this.give.valueChanges
        .pipe(
          tap((give: OfficeInterface) => {
            if (this.resetProps && !this.form.pristine) {
              this.reset()
            }

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

  readonly TabName = {
    give: 'Сдать в отделение',
    pickup: 'Вызвать курьера',
  }

  constructor(
    private fb: FormBuilder,
    private store: Store,
    @Inject(TuiDialogService) private readonly dialogService: TuiDialogService,
    @Inject(Injector) private readonly injector: Injector,
    @Self() @Inject(TuiDestroyService) private destroy$: TuiDestroyService,
    private utils: UtilsService
  ) {}

  ngOnInit(): void {
    this.fetchData()
    this.initializeValues()
  }

  fetchData() {
    this.store
      .select(isCitiesLoadedSelector)
      .pipe(
        filter((isCitiesLoaded: boolean) => !isCitiesLoaded),
        tap(() => this.store.dispatch(getCitiesAction())),
        takeUntil(this.destroy$)
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
      tap(() => {
        if (this.resetProps && !this.form.pristine) {
          this.reset()
        }
      }),
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
      this.store.select(officesSelector).pipe(filter(Boolean), take(1)), //take 1 ?
      this.store.select(startOfficeSelector),
    ]).pipe(
      tap(([offices, activeOffice]: [OfficeInterface[], OfficeInterface]) => {
        console.log('offices', offices)
        console.log('active office', activeOffice)

        const activeOfficeIndex =
          activeOffice &&
          offices.findIndex(
            (office: OfficeInterface) => office.id === activeOffice.id
          )

        if (
          (activeOffice === null || activeOfficeIndex === -1) &&
          this.give.enabled
        ) {
          this.give.setValue(offices[0])
        }
      }),
      map(([offices]: [OfficeInterface[], OfficeInterface]) => {
        return offices
      })
    )

    this.tabs$ = combineLatest([
      this.store.select(tabsSelector).pipe(filter(Boolean)),
      this.store.select(activeTabSelector),
    ]).pipe(
      switchMap(([offices, activeTab]) => {
        console.log('tabs offices', offices)

        const tabs = offices.map((office: OfficeInterface) => {
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

        console.log('tabs', tabs)

        if (activeTab && isActiveTabExists) {
          this.setActiveTab(activeTab)
        } else {
          this.setActiveTab(tabs[0])
        }

        return tabs
      })
    )

    this.city.disable()

    this.form.valueChanges
      .pipe(
        debounceTime(500),
        tap(() => {
          this.store.dispatch(changeValidityAction({isValid: this.form.valid}))
        }),
        takeUntil(this.destroy$)
      )
      .subscribe()

    this.store
      .select(isStartPointPristineSelector)
      .pipe(
        tap((isPristine: boolean) => {
          if (isPristine) {
            // this.form.reset()
            // this.date.setValue(this.setCurrentDate())
          }
        }),
        takeUntil(this.destroy$)
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

  reset() {
    // this.store.dispatch(resetEndPointAction())
    // this.store.dispatch(resetOrdersAction())
    // this.store.dispatch(calculateTotalSumAction({isTotalSumCalculated: false}))
  }

  getMinDate() {
    const date = new Date()
    return new TuiDay(date.getFullYear(), date.getMonth(), date.getDate())
  }
}
