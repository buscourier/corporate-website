import {Injectable} from '@angular/core'
import {Actions, createEffect, ofType} from '@ngrx/effects'
import {catchError, delay, map, of, switchMap} from 'rxjs'
import {ReportService} from '../../services/report.service'
import {ReportResponseInterface} from '../../types/report-response.interface'
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
      delay(600),
      switchMap(({ordersInput}) =>
        this.reportService.getOrders(ordersInput).pipe(
          map((orders: ReportResponseInterface) =>
            getOrdersSuccessAction({orders})
          ),
          catchError(() => of(getOrdersFailureAction()))
        )
      )
    )
  )
}
