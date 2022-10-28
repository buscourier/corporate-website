import {Injectable} from '@angular/core'
import {Actions, createEffect, ofType} from '@ngrx/effects'
import {catchError, map, of, switchMap} from 'rxjs'
import {OrdersService} from '../../../../services/orders.service'
import {OrderDetailsInterface} from '../../types/order-details.interface'
import {
  getOrderDetailsAction,
  getOrderDetailsFailureAction,
  getOrderDetailsSuccessAction,
} from '../actions/get-order-details.action'

@Injectable()
export class GetOrderDetailsEffect {
  constructor(
    private actions$: Actions,
    private ordersService: OrdersService
  ) {}

  getOrderDetails$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getOrderDetailsAction),
      switchMap(({orderId}) =>
        this.ordersService.getOrderDetails(orderId).pipe(
          map((details: OrderDetailsInterface) =>
            getOrderDetailsSuccessAction({details})
          ),
          catchError(() => of(getOrderDetailsFailureAction()))
        )
      )
    )
  )
}
