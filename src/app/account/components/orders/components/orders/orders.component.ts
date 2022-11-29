import {
  ChangeDetectionStrategy,
  Component,
  HostListener,
  Inject,
  Injector,
  OnInit,
} from '@angular/core'
import {Store} from '@ngrx/store'
import {TUI_SVG_SRC_PROCESSOR, TuiDialogService} from '@taiga-ui/core'
import {PolymorpheusComponent} from '@tinkoff/ng-polymorpheus'
import {filter, map, Observable} from 'rxjs'
import {currentUserSelector} from '../../../../../auth/store/selectors'
import {CurrentUserInterface} from '../../../../../shared/types/current-user.interface'
import {getOrdersAction} from '../../store/actions/get-orders.action'
import {isLoadingSelector, ordersSelector} from '../../store/selectors'
import {FilterInterface} from '../../types/filter.interface'
import {OrderDetailsComponent} from '../order-details/components/order-details/order-details.component'

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: TUI_SVG_SRC_PROCESSOR,
      useFactory: () => {
        return (src: string): string => {
          const myCustomPrefix = `icons::`

          return src.startsWith(myCustomPrefix)
            ? `assets/icons/${src.replace(myCustomPrefix, ``)}.svg`
            : src
        }
      },
    },
  ],
})
export class OrdersComponent implements OnInit {
  columns = ['date', 'order_id', 'order_price', 'status', 'print']

  isLoading$: Observable<boolean>
  orders$: Observable<any>
  filterParams: {
    'start-date': string | null
    'end-date': string | null
    status: string | null
  }
  length = 8
  pageIndex = 0
  breakpoint = window.matchMedia(`(min-width: 640px)`)
  isLargeScreen: boolean
  userId: string

  constructor(
    private store: Store,
    @Inject(TuiDialogService) private readonly dialogService: TuiDialogService,
    @Inject(Injector) private readonly injector: Injector
  ) {}

  ngOnInit(): void {
    this.fetchData()
    this.initializeValues()
  }

  fetchData() {
    this.store
      .select(currentUserSelector)
      .pipe(
        filter(Boolean),
        map((user: CurrentUserInterface) => {
          this.userId = user.id
          const ordersInput = {
            'user-id': user.id,
            'page-num': (this.pageIndex + 1).toString(),
            ...this.filterParams,
          }

          return this.store.dispatch(getOrdersAction({ordersInput}))
        })
      )
      .subscribe() //TODO: unsubscribe?
  }

  fetchDataWithFilterParams({range, status}: FilterInterface) {
    this.filterParams = {
      'start-date': range ? range[0] : null,
      'end-date': range ? range[1] : null,
      status: status ? status : null,
    }
    this.fetchData()
  }

  initializeValues() {
    this.isLoading$ = this.store.select(isLoadingSelector)
    this.orders$ = this.store.select(ordersSelector)
    this.isLargeScreen = this.breakpoint && this.breakpoint.matches
  }

  showDetails(id: string) {
    this.dialogService
      .open<any>(
        new PolymorpheusComponent(OrderDetailsComponent, this.injector),
        {
          data: {
            orderId: id,
            userId: this.userId,
          },
          dismissible: true,
          closeable: false,
          size: 's',
        }
      )
      .subscribe()
  }

  goToPage(index: number): void {
    this.pageIndex = index
    this.fetchData()
  }

  getIdValue(id: string) {
    return `<b class="hover:cursor-pointer">№ ${id}</b>`
  }

  @HostListener('window:resize') resizeWindow() {
    this.isLargeScreen = this.breakpoint && this.breakpoint.matches
  }
}
