import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Inject,
  Injector,
  OnInit,
  Self,
  ViewChild,
} from '@angular/core'
import {FormControl} from '@angular/forms'
import {Store} from '@ngrx/store'
import {TuiDestroyService, TuiScrollService} from '@taiga-ui/cdk'
import {TuiDialogContext, TuiDialogService} from '@taiga-ui/core'
import {tuiItemsHandlersProvider} from '@taiga-ui/kit'
import {
  PolymorpheusComponent,
  PolymorpheusContent,
} from '@tinkoff/ng-polymorpheus'
import {
  BehaviorSubject,
  combineLatest,
  delay,
  filter,
  map,
  Observable,
  startWith,
  Subscription,
  take,
  takeUntil,
} from 'rxjs'
import {tap} from 'rxjs/operators'
import {ModalMapComponent} from '../shared/components/modal-map/modal-map.component'
import {STRINGIFY_OFFICE} from '../shared/handlers/string-handlers'
import {OfficeInterface} from '../shared/types/office.interface'
import {
  isLargeScreenSelector,
  mdScreenSelector,
  smScreenSelector,
  xsScreenSelector,
} from '../store/global/selectors'
import {getOfficesAction} from './store/actions/get-offices.action'
import {
  backendErrorsSelector,
  isOfficesLoadingSelector,
  officesSelector,
} from './store/selectors'
import settings from '../settings'

const defaultOffice = {
  id: '0',
  name: 'Все города',
  address: '',
  phone: '',
  worktime: '',
  desc: '',
  office_id: '',
  site_id: '',
  home_id: '',
  get: '',
  give: '',
  delivery: '',
  pickup: '',
  geo_x: '',
  geo_y: '',
  pvz: '',
  pvz_comment: '',
}

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css'],
  providers: [
    tuiItemsHandlersProvider({stringify: STRINGIFY_OFFICE}),
    TuiDestroyService,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactsComponent implements OnInit {
  @ViewChild('main', {read: ElementRef}) main: ElementRef

  isOfficesLoading$: Observable<boolean>
  offices$: Observable<OfficeInterface[]>
  filteredOffices$: Observable<OfficeInterface[]>
  cities$: Observable<OfficeInterface[]>
  backendErrors$: Observable<string>
  xs$: Observable<boolean>
  sm$: Observable<boolean>
  md$: Observable<boolean>
  lg$: Observable<boolean>

  currentFilter$ = new BehaviorSubject('location')
  isFilterLoading = false

  currentOffice = null
  isCurrentOfficeLoading = false

  mapZoom = 12
  scrollTop = 0

  activeTabIndex = 1
  activeFilter = null
  isMobile = true
  isModalMode = false
  detailsOpened = false
  detailsModalSub: Subscription

  city = new FormControl(null)

  filterActions = [
    {
      id: 'location',
      name: 'Все адреса',
    },
    {
      id: 'give',
      name: 'Прием грузов',
    },
    {
      id: 'get',
      name: 'Выдача грузов',
    },
    {
      id: 'office',
      name: 'Офис',
    },
  ]

  constructor(
    private store: Store,
    @Self()
    @Inject(TuiDestroyService)
    private destroy$: TuiDestroyService,
    @Inject(TuiDialogService)
    private readonly dialogService: TuiDialogService,
    @Inject(Injector) private readonly injector: Injector,
    @Inject(TuiScrollService) private readonly scrollService: TuiScrollService
  ) {}

  ngOnInit(): void {
    this.initializeValues()
  }

  initializeValues() {
    this.isOfficesLoading$ = this.store.select(isOfficesLoadingSelector)
    this.offices$ = this.store.select(officesSelector).pipe(filter(Boolean))
    this.backendErrors$ = this.store.select(backendErrorsSelector)

    this.cities$ = this.offices$.pipe(
      filter(Boolean),
      map((offices: OfficeInterface[]) => {
        return [
          ...new Set(
            offices.map((office: OfficeInterface) => office.office_id)
          ),
        ].map((id: string) => {
          return offices.find(
            (office: OfficeInterface) => office.office_id === id
          )
        })
      }),
      map((offices: OfficeInterface[]) => {
        return [defaultOffice, ...offices]
      }),
      tap((offices: OfficeInterface[]) => {
        this.city.setValue(offices[0])
      })
    )

    this.filteredOffices$ = combineLatest([
      this.city.valueChanges.pipe(startWith(defaultOffice)),
      this.currentFilter$,
      this.offices$,
    ]).pipe(
      tap(() => {
        this.scroll()
      }),
      map(([city, currentFilter, offices]) => {
        this.isFilterLoading = true

        const filter =
          currentFilter === 'location'
            ? null
            : currentFilter === 'office'
            ? 'office_id'
            : currentFilter

        return offices
          .filter((office) => {
            return city.id !== '0'
              ? office.office_id === city.office_id
              : office
          })
          .filter((office) => {
            return filter ? office[filter] === '1' : office
          })
      }),
      delay(500),
      tap((offices: OfficeInterface[]) => {
        this.isFilterLoading = false

        if (offices.length > 4) {
          this.mapZoom = 7
        } else {
          this.mapZoom = 12
        }
      })
    )

    this.xs$ = this.store.select(xsScreenSelector).pipe(
      tap((ok: boolean) => {
        if (ok) {
          this.isModalMode = false
          this.scrollTop = 0
        }
      })
    )
    this.sm$ = this.store.select(smScreenSelector).pipe(
      tap((ok: boolean) => {
        if (ok) {
          this.isModalMode = true
          this.scrollTop = 0
        }
      })
    )
    this.md$ = this.store.select(mdScreenSelector).pipe(
      tap((ok: boolean) => {
        if (ok) {
          this.isModalMode = true
          this.scrollTop = 20
        }
      })
    )
    this.lg$ = this.store.select(isLargeScreenSelector).pipe(
      tap((ok: boolean) => {
        if (ok) {
          this.isModalMode = false

          if (this.detailsModalSub) {
            this.detailsModalSub.unsubscribe()
            //when resize screen and modal destroyed
            this.currentOffice = null
          }

          this.scrollTop = 40
        }
      })
    )
  }

  setActiveTabIndex(index: number) {
    this.activeTabIndex = index
    // this.city.updateValueAndValidity()
  }

  showDetails(
    office: OfficeInterface,
    content: PolymorpheusContent<TuiDialogContext>
  ) {
    this.currentOffice = office
    this.scroll()

    if (this.isModalMode) {
      this.detailsOpened = false

      this.detailsModalSub = this.dialogService
        .open(content, {
          size: 'm',
          closeable: false,
          // dismissible: false,
        })
        .pipe(take(1))
        .subscribe()
    } else {
      this.detailsOpened = true
    }
  }

  closeDetails(observer = null) {
    if (observer) {
      observer.complete()
    } else {
      this.detailsOpened = false
    }

    this.currentOffice = null
    this.mapZoom = 7
  }

  showOnMap(isMobile: boolean, office: OfficeInterface) {
    if (isMobile) {
      this.dialogService
        .open<any>(
          new PolymorpheusComponent(ModalMapComponent, this.injector),
          {
            data: {
              points: [office],
              disableScrollZoom: true,
              showHint: true,
            },
            dismissible: true,
            closeable: false,
            size: 'fullscreen',
          }
        )
        .pipe(take(1))
        .subscribe()
    } else {
      this.detailsOpened = false

      // if (this.detailsModalSub) {
      //   this.detailsModalSub.unsubscribe()
      // }
    }

    this.mapZoom = 15
  }

  setActiveFilter(id: string) {
    this.currentFilter$.next(id)
  }

  getOfficeStatus(office: OfficeInterface) {
    if (!office) {
      return false
    }

    let status = ''

    if (office.get === '1' && office.give === '1') {
      status = 'Офис принимает и выдает грузы'
    } else if (office.get === '1') {
      status = 'Офис только выдает грузы'
    } else if (office.give === '1') {
      status = 'Офис только принимает грузы'
    }

    return status
  }

  scroll() {
    return this.scrollService
      .scroll$(
        document.documentElement,
        this.scrollTop,
        0,
        settings.scrollDuration
      )
      .pipe(takeUntil(this.destroy$))
      .subscribe()
  }
}
