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
import {Store} from '@ngrx/store'
import {TuiDestroyService, TuiScrollService} from '@taiga-ui/cdk'
import {TuiDialogService} from '@taiga-ui/core'
import {PolymorpheusComponent} from '@tinkoff/ng-polymorpheus'
import {delay, filter, map, Observable, take, takeUntil} from 'rxjs'
import {tap} from 'rxjs/operators'
import {utils, write, writeFile} from 'xlsx'
import {currentUserSelector} from '../../../auth/store/selectors'
import settings from '../../../settings'
import {CurrentUserInterface} from '../../../shared/types/current-user.interface'
import {xsScreenSelector} from '../../../store/global/selectors'
import {PrintOrderComponent} from './components/print-order/print-order.component'
import {ViewOrderComponent} from './components/view-order/view-order.component'
import {getOrdersAction} from './store/actions/get-orders.action'
import {isLoadingSelector, ordersSelector} from './store/selectors'
import {FilterInterface} from './types/filter.interface'
import {OrderInterface} from './types/order.interface'
import {ReportResponseInterface} from './types/report-response.interface'

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css'],
  providers: [TuiDestroyService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReportComponent implements OnInit {
  @ViewChild('table', {read: ElementRef}) table: ElementRef
  @ViewChild('filter', {read: ElementRef}) filter: ElementRef

  isOrdersLoading$: Observable<boolean>
  orders$: Observable<OrderInterface[]>
  xs$: Observable<boolean>

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

  filterParams: {
    'start-date': string | null
    'end-date': string | null
    'start-city': string | null
    'end-city': string | null
  }
  pages = 0
  pageIndex = 0
  ordersOnPage = 10
  breakpoint = window.matchMedia(`(min-width: 640px)`)
  userId: string

  constructor(
    private store: Store,
    @Inject(TuiDialogService) private readonly dialogService: TuiDialogService,
    @Inject(Injector) private readonly injector: Injector,
    @Inject(TuiScrollService) private readonly scrollService: TuiScrollService,
    @Self() @Inject(TuiDestroyService) private destroy$: TuiDestroyService
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
        delay(0),
        tap(() => {
          this.scroll()
        }),
        map((user: CurrentUserInterface) => {
          this.userId = user.id

          const ordersInput = {
            'user-id': user.id,
            'page-num': (this.pageIndex + 1).toString(),
            'elements-on-page': this.ordersOnPage.toString(),
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
    this.isOrdersLoading$ = this.store.select(isLoadingSelector)
    this.orders$ = this.store.select(ordersSelector).pipe(
      filter(Boolean),
      map((response: ReportResponseInterface) => {
        const pages = Number(response.rows)
        const modulo = pages % this.ordersOnPage
        this.pages =
          Math.floor(pages / this.ordersOnPage) + (modulo > 0 ? 1 : 0)

        return response.orders
      })
    )

    this.xs$ = this.store.select(xsScreenSelector)
  }

  viewOrder(id: string) {
    this.dialogService
      .open<any>(new PolymorpheusComponent(ViewOrderComponent, this.injector), {
        data: {
          orderId: id,
          userId: this.userId,
        },
        dismissible: true,
        closeable: false,
        size: 's',
      })
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
          size: 'auto',
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

  exportToExcel(type, fn = null, dl = false) {
    const wb = utils.table_to_book(this.table.nativeElement, {
      sheet: 'Страница 1',
    })
    return dl
      ? write(wb, {bookType: type, bookSST: true, type: 'base64'})
      : writeFile(
          wb,
          fn ||
            `Выгрузка заказов на ${this.formatDate(Date.now())}.` +
              (type || 'xlsx')
        )
  }

  formatDate(date) {
    const formattedDate = new Intl.DateTimeFormat('ru-Ru', {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
    }).format(new Date(date))

    return formattedDate
  }

  scroll() {
    const scrollTop = 40
    // const scrollTop = this.filter.nativeElement.getBoundingClientRect().top

    return this.scrollService
      .scroll$(
        document.documentElement,
        scrollTop, //scrollTop + window.scrollY - 10
        0,
        settings.scrollDuration
      )
      .pipe(takeUntil(this.destroy$))
      .subscribe()
  }
}
