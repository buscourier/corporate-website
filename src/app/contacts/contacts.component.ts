import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  Injector,
  OnInit,
} from '@angular/core'
import {FormControl} from '@angular/forms'
import {Store} from '@ngrx/store'
import {TuiDialogContext, TuiDialogService} from '@taiga-ui/core'
import {tuiItemsHandlersProvider} from '@taiga-ui/kit'
import {
  PolymorpheusComponent,
  PolymorpheusContent,
} from '@tinkoff/ng-polymorpheus'
import {Observable, Subscription, take} from 'rxjs'
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

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css'],
  providers: [tuiItemsHandlersProvider({stringify: STRINGIFY_OFFICE})],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactsComponent implements OnInit {
  isOfficesLoading$: Observable<boolean>
  offices$: Observable<OfficeInterface[]>
  backendErrors$: Observable<string>
  xs$: Observable<boolean>
  sm$: Observable<boolean>
  md$: Observable<boolean>
  lg$: Observable<boolean>

  activeTabIndex = 1
  activeFilter = null
  isMobile = true
  isModalMode = false
  detailsOpened = false
  detailsModalSub: Subscription

  office = new FormControl('')

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
    @Inject(TuiDialogService)
    private readonly dialogService: TuiDialogService,
    @Inject(Injector) private readonly injector: Injector
  ) {}

  ngOnInit(): void {
    this.initializeValues()
    this.fetchData()
  }

  initializeValues() {
    this.isOfficesLoading$ = this.store.select(isOfficesLoadingSelector)
    this.offices$ = this.store.select(officesSelector)
    this.backendErrors$ = this.store.select(backendErrorsSelector)

    this.xs$ = this.store.select(xsScreenSelector).pipe(
      tap((ok: boolean) => {
        if (ok) {
          this.isModalMode = false
        }
      })
    )
    this.sm$ = this.store.select(smScreenSelector).pipe(
      tap((ok: boolean) => {
        if (ok) {
          this.isModalMode = true
        }
      })
    )
    this.md$ = this.store.select(mdScreenSelector).pipe(
      tap((ok: boolean) => {
        if (ok) {
          this.isModalMode = true
        }
      })
    )
    this.lg$ = this.store.select(isLargeScreenSelector).pipe(
      tap((ok: boolean) => {
        if (ok) {
          this.isModalMode = false

          if (this.detailsModalSub) {
            this.detailsModalSub.unsubscribe()
          }
        }
      })
    )
  }

  fetchData() {
    this.store.dispatch(getOfficesAction())
  }

  setActiveTabIndex(index: number) {
    this.activeTabIndex = index
  }

  showDetails(data, content: PolymorpheusContent<TuiDialogContext>) {
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
  }

  showOnMap(isMobile) {
    if (isMobile) {
      this.dialogService
        .open<any>(
          new PolymorpheusComponent(ModalMapComponent, this.injector),
          {
            data: {
              address: 'Address',
              points: [{geo_x: 0, geo_y: 0}],
            },
            dismissible: true,
            closeable: false,
            size: 'fullscreen',
          }
        )
        .pipe(take(1))
        .subscribe()
    } else {
      console.log('not mobile')
    }
  }

  setActiveFilter(id: string) {
    this.activeFilter = id
  }
}
