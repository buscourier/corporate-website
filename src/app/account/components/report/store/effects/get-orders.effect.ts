import {Injectable} from '@angular/core'
import {Actions, createEffect, ofType} from '@ngrx/effects'
import {catchError, delay, map, of, switchMap} from 'rxjs'
import {BackendErrorsInterface} from '../../../../../shared/types/backend-errors.interface'
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

  getOrders$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(getOrdersAction),
      delay(600),
      switchMap(({ordersInput}) => {
        return this.reportService.getOrders(ordersInput).pipe(
          map((orders: ReportResponseInterface) => {
            return getOrdersSuccessAction({orders})
          }),
          catchError((backendErrors: BackendErrorsInterface) => {
            return of(getOrdersFailureAction({backendErrors}))
          })
        )
      })
    )
  })
}
