import {ChangeDetectionStrategy, Component, Inject, OnInit} from '@angular/core'
import {isLoadingSelector, ordersSelector} from '../../store/selectors'
import {currentUserSelector} from '../../../../../auth/store/selectors'
import {Store} from '@ngrx/store'
import {getOrdersAction} from '../../store/actions/get-orders.action'
import {filter, map, Observable} from 'rxjs'
import {CurrentUserInterface} from '../../../../../shared/types/current-user.interface'
import {FilterInterface} from '../../types/filter.interface'
import {OrderDetailsService} from '../order-details/services/order-details.service'

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrdersComponent implements OnInit {
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
  length = 8
  pageIndex = 0

  constructor(
    private store: Store,
    @Inject(OrderDetailsService)
    private readonly orderDetailsService: OrderDetailsService
  ) {}

  ngOnInit(): void {
    this.fetchData()
    this.initializeValues()
    console.log('init orders')
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
          }

          return this.store.dispatch(getOrdersAction({ordersInput}))
        })
      )
      .subscribe()
  }

  fetchDataWithFilterParams({range, startCity, endCity}: FilterInterface) {
    const params = {
      'start-date': range ? range[0] : null,
      'end-date': range ? range[1] : null,
      'start-city': startCity ? startCity.id : null,
      'end-city': endCity ? endCity.id : null,
    }

    this.store
      .select(currentUserSelector)
      .pipe(
        filter(Boolean),
        map((user: CurrentUserInterface) => {
          const ordersInput = {
            'user-id': user.id,
            ...params,
          }

          return this.store.dispatch(getOrdersAction({ordersInput}))
        })
      )
      .subscribe()
  }

  initializeValues() {
    this.isLoading$ = this.store.select(isLoadingSelector)
    this.orders$ = this.store.select(ordersSelector)
  }

  showDetails(id: string) {
    this.orderDetailsService.open(null).subscribe()
  }

  goToPage(index: number): void {
    this.pageIndex = index
    this.fetchData()
  }
}
