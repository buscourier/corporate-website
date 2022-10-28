import {Injectable} from '@angular/core'
import {Actions, createEffect, ofType} from '@ngrx/effects'
import {catchError, map, of, switchMap} from 'rxjs'
import {ReportService} from '../../services/report.service'
import {OrderInterface} from '../../types/order.interface'
import {
  getOrdersAction,
  getOrdersFailureAction,
  getOrdersSuccessAction,
} from '../actions/get-orders.action'

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
