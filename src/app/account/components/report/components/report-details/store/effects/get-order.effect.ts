import {Injectable} from '@angular/core'
import {Actions, createEffect, ofType} from '@ngrx/effects'
import {catchError, map, of, switchMap} from 'rxjs'
import {ReportService} from '../../../../services/report.service'
import {OrderDetailsInterface} from '../../types/order-details.interface'
import {
  getOrderAction,
  getOrderFailureAction,
  getOrderSuccessAction,
} from '../actions/get-order.action'

@Injectable()
export class GetOrderEffect {
  constructor(
    private actions$: Actions,
    private reportService: ReportService
  ) {}

  getOrder$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getOrderAction),
      switchMap(({orderId}) =>
        this.reportService.getOrderDetails(orderId).pipe(
          map((details: OrderDetailsInterface) =>
            getOrderSuccessAction({details})
          ),
          catchError(() => of(getOrderFailureAction()))
        )
      )
    )
  )
}
