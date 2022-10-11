import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core'
import {ordersSelector} from '../../store/selectors'
import {currentUserSelector} from '../../../../../auth/store/selectors'
import {select, Store} from '@ngrx/store'
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
    this.orders$ = this.store.pipe(select(ordersSelector))
  }
}
