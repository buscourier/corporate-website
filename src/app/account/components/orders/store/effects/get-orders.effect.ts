import {Injectable} from '@angular/core'
import {catchError, map, of, switchMap} from 'rxjs'
import {Actions, createEffect, ofType} from '@ngrx/effects'
import {
  getOrdersAction,
  getOrdersFailureAction,
  getOrdersSuccessAction,
} from '../actions/get-orders.action'
import {OrdersService} from '../../services/orders.service'

@Injectable()
export class GetOrdersEffect {
  constructor(
    private actions$: Actions,
    private ordersService: OrdersService
  ) {}

  getOrders$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getOrdersAction),
      switchMap(({ordersInput}) =>
        this.ordersService.getOrders(ordersInput).pipe(
          map((orders: any) => getOrdersSuccessAction({orders})),
          catchError(() => of(getOrdersFailureAction()))
        )
      )
    )
  )
}
