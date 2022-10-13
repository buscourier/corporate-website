import {Injectable} from '@angular/core'
import {Actions, createEffect, ofType} from '@ngrx/effects'
import {createAction} from '@ngrx/store'
import {catchError, map, of, switchMap} from 'rxjs'
import {OrdersService} from '../../../../services/orders.service'
import {OrderDetailsInterface} from '../../types/order-details.interface'
import {
  getOrderDetailsAction,
  getOrderDetailsFailureAction,
  getOrderDetailsSuccessAction,
} from '../actions/get-order-details.action'
import {
  getEndCitiesAction,
  getEndCitiesFailureAction,
  getEndCitiesSuccessAction,
} from '../../../filter/store/actions/get-end-cities.action'
import {EndCityInterface} from '../../../../../../../shared/types/end-city.interface'
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
      switchMap(({order}) =>
        this.ordersService.cancelOrder(order).pipe(
          map(() => cancelOrderSuccessAction()),
          catchError(() => of(cancelOrderFailureAction()))
        )
      )
    )
  )
}
