import {Injectable} from '@angular/core'
import {catchError, map, of, switchMap} from 'rxjs'
import {Actions, createEffect, ofType} from '@ngrx/effects'
import {
  getOrdersAction,
  getOrdersFailureAction,
  getOrdersSuccessAction,
} from '../actions/get-orders.action'
import {OrderInterface} from '../../types/order.interface'
import {ReportService} from '../../services/report.service'

@Injectable()
export class GetOrdersEffect {
  constructor(
    private actions$: Actions,
    private reportService: ReportService
  ) {}

  getOrders$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getOrdersAction),
      switchMap(({ordersInput}) =>
        this.reportService.getOrders(ordersInput).pipe(
          map((orders: OrderInterface[]) => getOrdersSuccessAction({orders})),
          catchError(() => of(getOrdersFailureAction()))
        )
      )
    )
  )
}
