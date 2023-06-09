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
import {TuiDestroyService} from '@taiga-ui/cdk'
import {TuiDialogService} from '@taiga-ui/core'
import {TUI_VALIDATION_ERRORS, tuiItemsHandlersProvider} from '@taiga-ui/kit'
import {PolymorpheusComponent} from '@tinkoff/ng-polymorpheus'
import {
  combineLatest,
  debounceTime,
  delay,
  filter,
  map,
  Observable,
  of,
  pairwise,
  startWith,
  Subject,
  switchMap,
  take,
  takeUntil,
  using,
} from 'rxjs'
import {concatAll, tap, toArray} from 'rxjs/operators'
import {ModalMapComponent} from '../../../../shared/components/modal-map/modal-map.component'
import {STRINGIFY_CITIES} from '../../../../shared/handlers/string-handlers'
import {UtilsService} from '../../../../shared/services/utils.service'
import {EndCityInterface} from '../../../../shared/types/end-city.interface'
import {OfficeInterface} from '../../../../shared/types/office.interface'
import {StartCityInterface} from '../../../../shared/types/start-city.interface'
import {calculateTotalSumAction} from '../../../components/sidebar/store/actions/calculate-total-sum.action'
import {resetOrdersAction} from '../orders/store/actions/reset-orders.action'
import {
  isStartPointValidSelector,
  startCitySelector,
} from '../start-point/store/selectors'
import {changeActiveTabAction} from './store/actions/change-active-tab.action'
import {changeBusAction} from './store/actions/change-bus.action'
import {changeCityAction} from './store/actions/change-city.action'
import {changeCourierAction} from './store/actions/change-courier.action'
import {changeOfficeAction} from './store/actions/change-office.action'
import {changeValidityAction} from './store/actions/change-validity.action'
import {getCitiesAction} from './store/actions/get-cities.action'
import {getOfficesAction} from './store/actions/get-offices.action'
import {
  activeTabSelector,
  busSelector,
  citiesSelector,
  endCitySelector,
  endCourierSelector,
  endOfficeSelector,
  isCitiesLoadedSelector,
  isCitiesLoadingSelector,
  isEndPointPristineSelector,
  isOfficesLoadingSelector,
  officesSelector,
  tabsSelector,
} from './store/selectors'

@Component({
  selector: 'app-end-point',
  templateUrl: './end-point.component.html',
  styleUrls: ['./end-point.component.css'],
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
export class EndPointComponent implements OnInit {
  @Input() boldCityLabel: boolean
  @Input('reset') resetProps = false

  isCitiesLoading$: Observable<boolean>
  isCitiesLoaded$: Observable<boolean>
  isOfficesLoading$: Observable<boolean>
  isStartPointValid$: Observable<boolean>
  cities$: Observable<EndCityInterface[]>
  offices$: Observable<OfficeInterface[]>
  backendErrors$: Observable<string | null>
  tabs$: Observable<any>
  activeTab$: Observable<string>
  searchCity$: Subject<string | null> = new Subject()

  city = this.fb.control(null, [Validators.required])
  get = this.fb.control(null, [Validators.required])
  needToMeet = this.fb.control(null, [Validators.required])
  delivery = this.fb.control(null, [Validators.required])

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
          switchMap((city: EndCityInterface) => {
            this.store.dispatch(changeCityAction({city}))
            return of(city)
          }),
          switchMap((city: EndCityInterface) => {
            this.store.dispatch(getOfficesAction({id: city.office_id}))
            return of(city)
          })
        )
        .subscribe(),
    () => this.store.select(endCitySelector)
  )

  getValues$ = using(
    () =>
      this.get.valueChanges
        .pipe(
          tap((get: OfficeInterface) => {
            // if (this.resetProps && !this.form.pristine) {
            //   this.reset()
            // }

            this.store.dispatch(changeOfficeAction({get}))
          })
        )
        .subscribe(),
    () => this.store.select(endOfficeSelector)
  )

  needToMeetValues$ = using(
    () =>
      this.needToMeet.valueChanges
        .pipe(
          tap((needToMeet: boolean) => {
            this.store.dispatch(changeBusAction({needToMeet}))
          })
        )
        .subscribe(),
    () => this.store.select(busSelector)
  )

  deliveryValues$ = using(
    () =>
      this.delivery.valueChanges
        .pipe(
          pairwise(),
          tap(([prev, next]) => {
            if (prev === null || next === null) {
              this.store.dispatch(changeCourierAction({delivery: null}))
            } else if (!this.utils.isObjectsEqual(prev, next)) {
              this.store.dispatch(changeCourierAction({delivery: next}))
            }
          })
        )
        .subscribe(),
    () => this.store.select(endCourierSelector)
  )

  form = this.fb.group({
    city: this.city,
    get: this.get,
    delivery: this.delivery,
    needToMeet: this.needToMeet,
  })

  readonly TabName = {
    get: 'Забрать в отделение',
    delivery: 'Вызвать курьера',
    meet: 'Встретить с автобуса',
  }

  constructor(
    private fb: FormBuilder,
    private store: Store,
    private utils: UtilsService,
    @Inject(TuiDialogService) private readonly dialogService: TuiDialogService,
    @Inject(Injector) private readonly injector: Injector,
    @Self() @Inject(TuiDestroyService) private destroy$: TuiDestroyService
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
        switchMap(() => {
          return this.store.select(startCitySelector).pipe(filter(Boolean))
        }),
        switchMap((startCity: StartCityInterface) => {
          this.store.dispatch(getCitiesAction({cityId: startCity.id}))
          return of(null)
        }),
        takeUntil(this.destroy$)
      )
      .subscribe()
  }

  initializeValues() {
    this.isCitiesLoading$ = this.store.select(isCitiesLoadingSelector)
    this.isOfficesLoading$ = this.store.select(isOfficesLoadingSelector)

    this.cities$ = combineLatest([
      this.store.select(citiesSelector).pipe(filter(Boolean)),
      this.searchCity$.pipe(
        startWith(''),
        filter((searchQuery: string | null) => searchQuery !== null)
      ),
    ]).pipe(
      debounceTime(1000),
      map(([cities, searchQuery]: [EndCityInterface[], string]) => {
        // console.log('cities', cities)
        return cities.filter((city: EndCityInterface) => {
          return city.name
            .toLowerCase()
            .includes(searchQuery && searchQuery.toLowerCase())
        })
      })
    )

    this.activeTab$ = this.store.select(activeTabSelector).pipe(
      // tap(() => {
      //   if (this.resetProps && !this.form.pristine) {
      //     this.reset()
      //   }
      // }),
      delay(0),
      tap((tab: any) => {
        switch (tab) {
          case 'get':
            this.get.enable()
            this.needToMeet.setValue(false)
            this.needToMeet.disable()
            this.delivery.setValue(null)
            this.delivery.disable()
            break
          case 'delivery':
            this.delivery.enable()
            this.get.setValue(null)
            this.get.disable()
            this.needToMeet.setValue(false)
            this.needToMeet.disable()
            break
          case 'meet':
            this.needToMeet.enable()
            this.get.setValue(null)
            this.get.disable()
            this.delivery.setValue(null)
            this.delivery.disable()

            setTimeout(() => {
              this.needToMeet.setValue(true)
            }, 0)
            break
        }
      })
    )

    this.offices$ = combineLatest([
      this.store.select(officesSelector).pipe(
        filter(Boolean),
        switchMap((offices: OfficeInterface[]) => {
          return of(offices).pipe(
            concatAll(),
            map((office: OfficeInterface) => {
              return {
                ...office,
                name: office.address,
              }
            }),
            toArray()
          )
        })
      ),
      this.store.select(endOfficeSelector),
    ]).pipe(
      delay(0),
      switchMap(
        ([offices, activeOffice]: [OfficeInterface[], OfficeInterface]) => {
          console.log('offices', offices)
          // console.log('activeOffice', activeOffice)
          const activeOfficeIndex =
            activeOffice &&
            offices.findIndex(
              (office: OfficeInterface) => office.id === activeOffice.id
            )

          if (
            (activeOffice === null || activeOfficeIndex === -1) &&
            this.get.enabled
          ) {
            this.get.setValue(offices[0])
          }

          return of(offices)
        }
      )
    )

    this.tabs$ = combineLatest([
      this.store.select(tabsSelector).pipe(filter(Boolean)),
      this.store.select(activeTabSelector),
      this.store.select(endCitySelector).pipe(filter(Boolean)),
    ]).pipe(
      switchMap(([offices, activeTab, city]) => {
        // console.log('tabs', offices)
        const tabs = offices.map((office: OfficeInterface) => {
          return Object.entries(office)
            .filter((item: [string, string]) => {
              return (
                (item[0] === 'get' && item[1] === '1') ||
                (item[0] === 'delivery' && item[1] === '1')
              )
            })
            .map((item: [string, any]) => {
              return item[0]
            })
        })

        return of([tabs, activeTab, city])
      }),
      debounceTime(300),
      map(([tabsArray, activeTab, city]: [any, string, EndCityInterface]) => {
        const tabs = tabsArray.length ? tabsArray[0] : []

        if (city.need_to_meet === '1') {
          tabs.push('meet')
        }

        const isActiveTabExists = tabs.find((tab: string) => tab === activeTab)

        if (activeTab && isActiveTabExists) {
          this.setActiveTab(activeTab)
        } else {
          this.setActiveTab(tabs[0])
        }

        return tabs
      })
    )

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
      .select(isEndPointPristineSelector)
      .pipe(
        tap((isPristine: boolean) => {
          if (isPristine) {
            this.form.reset()
          }
        }),
        takeUntil(this.destroy$)
      )
      .subscribe()

    this.store
      .select(isStartPointValidSelector)
      .pipe(
        delay(0),
        tap((isValid: boolean) => {
          if (isValid && this.form.disabled) {
            this.form.enable({emitEvent: false})
            this.city.updateValueAndValidity({onlySelf: true})
          } else if (!isValid) {
            this.form.disable({emitEvent: false})
          }
        }),
        takeUntil(this.destroy$)
      )
      .subscribe()
  }

  setActiveTab(activeTab: string) {
    this.store.dispatch(changeActiveTabAction({activeTab}))
  }

  showMap() {
    const office: OfficeInterface = this.get.value

    if (!office) {
      return
    }

    this.dialogService
      .open<any>(new PolymorpheusComponent(ModalMapComponent, this.injector), {
        data: {
          points: [office],
        },
        dismissible: true,
        closeable: true,
        size: 'fullscreen',
      })
      .pipe(take(1))
      .subscribe()
  }

  reset() {
    this.store.dispatch(resetOrdersAction())
    this.store.dispatch(calculateTotalSumAction({isTotalSumCalculated: false}))
  }

  onSearchChange(searchQuery: string | null): void {
    this.searchCity$.next(searchQuery)
  }
}
