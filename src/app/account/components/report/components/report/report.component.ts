import {
  ChangeDetectionStrategy,
  Component,
  HostListener,
  Inject,
  OnInit,
} from '@angular/core'
import {isLoadingSelector, ordersSelector} from '../../store/selectors'
import {currentUserSelector} from '../../../../../auth/store/selectors'
import {Store} from '@ngrx/store'
import {getOrdersAction} from '../../store/actions/get-orders.action'
import {filter, map, Observable} from 'rxjs'
import {CurrentUserInterface} from '../../../../../shared/types/current-user.interface'
import {FilterInterface} from '../../types/filter.interface'
import {ReportDetailsService} from '../report-details/services/report-details.service'

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
  ]

  isLoading$: Observable<boolean>
  orders$: Observable<any>
  filterParams: {
    'start-date': string | null
    'end-date': string | null
    'start-city': string | null
    'end-city': string | null
  }
  length = 8
  pageIndex = 0
  breakpoint = window.matchMedia(`(min-width: 640px)`)
  isLargeScreen: boolean

  constructor(
    private store: Store,
    @Inject(ReportDetailsService)
    private readonly orderDetailsService: ReportDetailsService
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
          const ordersInput = {
            'user-id': user.id,
            'page-num': (this.pageIndex + 1).toString(),
            ...this.filterParams,
          }

          return this.store.dispatch(getOrdersAction({ordersInput}))
        })
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
    this.orders$ = this.store.select(ordersSelector)
    this.isLargeScreen = this.breakpoint && this.breakpoint.matches
  }

  showDetails(id: string) {
    console.log('id', id)
    this.orderDetailsService.open(null).subscribe()
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
