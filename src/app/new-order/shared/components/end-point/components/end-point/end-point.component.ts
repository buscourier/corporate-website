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
  startWith,
  Subscription,
  switchMap,
  take,
  using,
} from 'rxjs'
import {concatAll, tap, toArray} from 'rxjs/operators'
import {ModalMapComponent} from '../../../../../../shared/components/modal-map/modal-map.component'
import {STRINGIFY_CITIES} from '../../../../../../shared/handlers/string-handlers'
import {EndCityInterface} from '../../../../../../shared/types/end-city.interface'
import {OfficeInterface} from '../../../../../../shared/types/office.interface'
import {StartCityInterface} from '../../../../../../shared/types/start-city.interface'
import {CourierInterface} from '../../../../types/courier.interface'
import {startCitySelector} from '../../../start-point/store/selectors'
import {changeActiveTabAction} from '../../store/actions/change-active-tab.action'
import {changeBusAction} from '../../store/actions/change-bus.action'
import {changeCityAction} from '../../store/actions/change-city.action'
import {changeCourierAction} from '../../store/actions/change-courier.action'
import {changeOfficeAction} from '../../store/actions/change-office.action'
import {changeValidityAction} from '../../store/actions/change-validity.action'
import {getCitiesAction} from '../../store/actions/get-cities.action'
import {getOfficesAction} from '../../store/actions/get-offices.action'
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
} from '../../store/selectors'
import {UtilsService} from '../../../../../../shared/services/utils.service'

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
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EndPointComponent implements OnInit, OnDestroy {
  @Input() boldCityLabel: boolean

  isCitiesLoading$: Observable<boolean>
  isCitiesLoaded$: Observable<boolean>
  isOfficesLoading$: Observable<boolean>
  cities$: Observable<EndCityInterface[]>
  offices$: Observable<OfficeInterface[]>
  backendErrors$: Observable<string | null>
  tabs$: Observable<any>
  activeTabIndex$: Observable<number>

  //TODO: add needToMeetTab
  needToMeetTab = false

  city = this.fb.control(null, [Validators.required])
  get = this.fb.control(null, [Validators.required])
  needToMeet = this.fb.control(null, [Validators.required])
  delivery = this.fb.control(null, [Validators.required])

  cityValues$ = using(
    () =>
      this.city.valueChanges
        .pipe(
          filter(Boolean),
          // tap(() => {
          //   this.setActiveTabIndex(0)
          // }),
          tap((city: EndCityInterface) => {
            if (city.need_to_meet === '1') {
              this.needToMeetTab = true
            } else {
              this.needToMeetTab = false
            }

            //TODO: Check is that way correct, maybe need switch to map
            this.store.dispatch(changeCityAction({city}))
            this.store.dispatch(getOfficesAction({id: city.office_id}))
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
            console.log('needToMeet.valueChanges', needToMeet)
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

  formValuesSub: Subscription
  isEndPointPristineSub: Subscription

  readonly TabName = {
    get: 'Забрать в отделение',
    delivery: 'Вызвать курьера',
    needToMeet: 'Встретить с автобуса',
  }

  constructor(
    private fb: FormBuilder,
    private store: Store,
    private utils: UtilsService,
    @Inject(TuiDialogService) private readonly dialogService: TuiDialogService,
    @Inject(Injector) private readonly injector: Injector
  ) {}

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
        // filter((isCitiesLoaded: boolean) => !isCitiesLoaded),
        switchMap(() => {
          return this.store.select(startCitySelector).pipe(
            filter(Boolean),
            tap((startCity: StartCityInterface) => {
              this.store.dispatch(getCitiesAction({cityId: startCity.id}))
            })
          )
        })
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
            this.get.enable()
            this.needToMeet.setValue(false)
            this.needToMeet.disable()
            this.delivery.setValue(null)
            this.delivery.disable()
            break
          case 1:
            this.delivery.enable()
            this.get.setValue(null)
            this.get.disable()
            this.needToMeet.setValue(false)
            this.needToMeet.disable()
            break
          case 2:
            this.needToMeet.enable()
            this.get.setValue(null)
            this.get.disable()
            this.delivery.setValue(null)
            this.delivery.disable()

            setTimeout(() => {
              this.needToMeet.setValue(true)
            }, 0)

            // this.store.dispatch(changeCourierAction({delivery: null}))
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
                (item[0] === 'get' && item[1] === '1') ||
                (item[0] === 'delivery' && item[1] === '1')
              )
            })
            .map((item: [string, any]) => {
              return item[0]
            })
        })

        return of([tabs, activeTab])
      }),
      map(([tabsArray, activeTab]: [any, number]) => {
        const tabs = tabsArray.length ? tabsArray[0] : []
        const get = tabs.find((tab: string) => tab === 'get')
        const delivery = tabs.find((tab: string) => tab === 'delivery')

        if (
          (!tabs.length && this.needToMeetTab) ||
          (tabs.length && this.needToMeetTab && activeTab === 2)
        ) {
          this.setActiveTabIndex(2)
        } else if (delivery && activeTab === 1) {
          this.setActiveTabIndex(1)
        } else {
          this.setActiveTabIndex(0)
        }

        return tabs
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

    this.isEndPointPristineSub = this.store
      .select(isEndPointPristineSelector)
      .pipe(
        tap((isPristine: boolean) => {
          if (isPristine) {
            this.form.reset()
            this.city.disable()
          }
        })
      )
      .subscribe()
  }

  setActiveTabIndex(index: number) {
    this.store.dispatch(changeActiveTabAction({activeTabIndex: index}))
  }

  // findTab(name) {
  //   return this.tabs.find((tabName: string) => tabName === name)
  // }

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
}
