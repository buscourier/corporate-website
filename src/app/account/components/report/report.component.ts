import {
  ChangeDetectionStrategy,
  Component,
  HostListener,
  Inject,
  Injector,
  OnInit,
} from '@angular/core'
import {Store} from '@ngrx/store'
import {TuiDialogService} from '@taiga-ui/core'
import {PolymorpheusComponent} from '@tinkoff/ng-polymorpheus'
import {filter, map, Observable, take} from 'rxjs'
import {currentUserSelector} from '../../../auth/store/selectors'
import {CurrentUserInterface} from '../../../shared/types/current-user.interface'
import {PrintOrderComponent} from './components/print-order/print-order.component'
import {ReportDetailsComponent} from './components/report-details/components/report-details/report-details.component'
import {getOrdersAction} from './store/actions/get-orders.action'
import {isLoadingSelector, ordersSelector} from './store/selectors'
import {FilterInterface} from './types/filter.interface'
import {OrderInterface} from './types/order.interface'
import {ReportResponseInterface} from './types/report-response.interface'

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReportComponent implements OnInit {
  columns = [
    'order_id',
    'date',
    'sender_name',
    'recipient_name',
    'start_city',
    'end_city',
    'order_price',
    'status',
    'print',
  ]

  isLoading$: Observable<boolean>
  orders$: Observable<OrderInterface[]>
  filterParams: {
    'start-date': string | null
    'end-date': string | null
    'start-city': string | null
    'end-city': string | null
  }
  pages = 8
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
        }),
        take(1)
      )
      .subscribe()
  }

  fetchDataWithFilterParams({range, startCity, endCity}: FilterInterface) {
    this.filterParams = {
      'start-date': range ? range[0] : null,
      'end-date': range ? range[1] : null,
      'start-city': startCity ? startCity.id : null,
      'end-city': endCity ? endCity.id : null,
    }
    this.fetchData()
  }

  initializeValues() {
    this.isLoading$ = this.store.select(isLoadingSelector)
    this.orders$ = this.store.select(ordersSelector).pipe(
      filter(Boolean),
      map((response: ReportResponseInterface) => {
        const pages = Number(response.rows)
        const modulo = pages % 10
        this.pages = Math.floor(pages / 10) + (modulo > 0 ? 1 : 0)

        return response.orders
      })
    )
    this.isLargeScreen = this.breakpoint && this.breakpoint.matches
  }

  showDetails(id: string) {
    this.dialogService
      .open<any>(
        new PolymorpheusComponent(ReportDetailsComponent, this.injector),
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
      .pipe(take(1))
      .subscribe()
  }

  printOrder(id: string) {
    this.dialogService
      .open<any>(
        new PolymorpheusComponent(PrintOrderComponent, this.injector),
        {
          data: {
            orderId: id,
            userId: this.userId,
          },
          dismissible: true,
          closeable: false,
          size: 'l',
        }
      )
      .pipe(take(1))
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
