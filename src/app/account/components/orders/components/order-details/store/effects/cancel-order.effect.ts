import {Injectable} from '@angular/core'
import {Actions, createEffect, ofType} from '@ngrx/effects'
import {catchError, map, of, switchMap} from 'rxjs'
import {OrdersService} from '../../../../services/orders.service'
import {
  cancelOrderAction,
  cancelOrderFailureAction,
  cancelOrderSuccessAction,
} from '../actions/cancel-order.action'

@Injectable()
export class CancelOrderEffect {
  constructor(
    private actions$: Actions,
    private ordersService: OrdersService
  ) {}

  cancelOrder$ = createEffect(() =>
    this.actions$.pipe(
      ofType(cancelOrderAction),
      switchMap(({data}) =>
        this.ordersService.cancelOrder(data).pipe(
          map(() => cancelOrderSuccessAction()),
          catchError(() => of(cancelOrderFailureAction()))
        )
      )
    )
  )
}
