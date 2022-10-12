import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core'
import {isLoadingSelector, ordersSelector} from '../../store/selectors'
import {currentUserSelector} from '../../../../../auth/store/selectors'
import {Store} from '@ngrx/store'
import {getOrdersAction} from '../../store/actions/get-orders.action'
import {map, Observable} from 'rxjs'
import {CurrentUserInterface} from '../../../../../shared/types/current-user.interface'

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

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.fetchData()
    this.initializeValues()
  }

  fetchData() {
    this.store
      .select(currentUserSelector)
      .pipe(
        map((user: CurrentUserInterface) => {
          const ordersInput = {
            'user-id': user.id,
            'start-date': null,
            'end-date': null,
            'start-city': null,
            'end-city': null,
            'elements-on-page': null,
            'page-num': null,
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
}
