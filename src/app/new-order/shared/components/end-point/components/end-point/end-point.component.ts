import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core'
import {FormBuilder, Validators} from '@angular/forms'
import {Store} from '@ngrx/store'
import {TUI_VALIDATION_ERRORS, tuiItemsHandlersProvider} from '@taiga-ui/kit'
import {filter, first, map, Observable, of, switchMap, using} from 'rxjs'
import {concatAll, tap} from 'rxjs/operators'
import {StartCityInterface} from 'src/app/shared/types/start-city.interface'
import {STRINGIFY_CITIES} from '../../../../../../shared/handlers/string-handlers'
import {EndCityInterface} from '../../../../../../shared/types/end-city.interface'
import {OfficeInterface} from '../../../../../../shared/types/office.interface'
import {CourierInterface} from '../../../../types/courier.interface'
import {startCitySelector} from '../../../start-point/store/selectors'
import {changeActiveTabAction} from '../../store/actions/change-active-tab.action'
import {changeBusAction} from '../../store/actions/change-bus.action'
import {changeCityAction} from '../../store/actions/change-city.action'
import {changeCourierAction} from '../../store/actions/change-courier.action'
import {changeOfficeAction} from '../../store/actions/change-office.action'
import {getCitiesAction} from '../../store/actions/get-cities.action'
import {getOfficesAction} from '../../store/actions/get-offices.action'
import {
  activeTabSelector,
  busSelector,
  citiesSelector,
  courierSelector,
  endCitySelector,
  isCitiesLoadedSelector,
  isCitiesLoadingSelector,
  isOfficesLoadingSelector,
  officeSelector,
  officesSelector,
} from '../../store/selectors'

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
export class EndPointComponent implements OnInit {
  isCitiesLoading$: Observable<boolean>
  isCitiesLoaded$: Observable<boolean>
  isOfficesLoading$: Observable<boolean>
  cities$: Observable<EndCityInterface[]>
  offices$: Observable<OfficeInterface[]>
  backendErrors$: Observable<string | null>
  activeTabIndex$: Observable<number>

  readonly timeRange = ['8.00 - 14.00', '14.00 - 18.00']
  tabs: string[] = []

  city = this.fb.control(null, [Validators.required])
  get = this.fb.control(null, [Validators.required])
  needToMeet = this.fb.control(null, [Validators.required])
  delivery = this.fb.group({
    street: ['', [Validators.required]],
    building: ['', [Validators.required]],
    apartment: ['', [Validators.required]],
    time: [this.timeRange[0], [Validators.required]],
  })

  cityValues$ = using(
    () =>
      this.city.valueChanges
        .pipe(
          filter(Boolean),
          tap((city: EndCityInterface) => {
            //TODO: Check is that way correct, maybe need switch to map
            this.store.dispatch(changeCityAction({city}))
            this.store.dispatch(getOfficesAction({id: city.office_id}))

            // if (city.need_to_meet !== '0') {
            //   this.tabs.push('needToMeet')
            // }
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
            if (get) {
              this.store.dispatch(changeOfficeAction({get}))
            }
          })
        )
        .subscribe(),
    () => this.store.select(officeSelector)
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
          tap((delivery: CourierInterface) => {
            this.store.dispatch(changeCourierAction({delivery}))
          })
        )
        .subscribe(),
    () => this.store.select(courierSelector)
  )

  form = this.fb.group({
    city: this.city,
    get: this.get,
    delivery: this.delivery,
    needToMeet: this.needToMeet,
  })

  readonly TabName = {
    get: 'Забрать в отделении',
    delivery: 'Вызвать курьера',
    needToMeet: 'Встретить с автобуса',
  }

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
        // switch (index) {
        //   case 0:
        //     this.give.enable()
        //     this.pickup.disable()
        //     this.store.dispatch(changeCourierAction({pickup: null}))
        //     break
        //   case 1:
        //     this.pickup.enable()
        //     this.give.disable()
        //     this.store.dispatch(changeOfficeAction({give: null}))
        //     break
        // }
      })
    )

    this.offices$ = this.store.select(officesSelector).pipe(
      filter(Boolean),
      tap((offices: OfficeInterface[]) => {
        // if (offices.length < 2) {
        //   this.give.patchValue(offices[0])
        // }
        // this.form.get('get').setValue(offices[0]) //TODO consider another way to set default office
        this.createTabControls(offices)
      })
    )

    this.city.disable()
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
                    (item[0] === 'get' && item[1] === '1') ||
                    (item[0] === 'delivery' && item[1] === '1')
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
        this.tabs = [...this.tabs, ...tabs]
      })
  }

  setActiveTabIndex(index: number) {
    this.store.dispatch(changeActiveTabAction({activeTabIndex: index}))
  }
}
