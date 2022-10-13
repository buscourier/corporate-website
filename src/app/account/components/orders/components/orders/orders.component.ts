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

  constructor(
    private store: Store,
    @Inject(OrderDetailsService)
    private readonly orderDetailsService: OrderDetailsService
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
          }

          return this.store.dispatch(getOrdersAction({ordersInput}))
        })
      )
      .subscribe()
  }

  fetchDataWithFilterParams({dateRange, startCity, endCity}: FilterInterface) {
    const params = {
      'start-date': dateRange ? dateRange.from : null,
      'end-date': dateRange ? dateRange.to : null,
      'start-city': startCity,
      'end-city': endCity,
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
}
