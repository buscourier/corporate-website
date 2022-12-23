import {HttpErrorResponse} from '@angular/common/http'
import {Injectable} from '@angular/core'
import {Actions, createEffect, ofType} from '@ngrx/effects'
import {catchError, map, of, switchMap} from 'rxjs'
import {ReportService} from '../../services/report.service'
import {OrderDetailsInterface} from '../../types/order-details.interface'
import {
  getOrderDetailsAction,
  getOrderDetailsFailureAction,
  getOrderDetailsSuccessAction,
} from '../actions/get-order-details.action'

@Injectable()
export class GetOrderDetailsEffect {
  constructor(private actions$: Actions, private service: ReportService) {}

  getOrderDetails$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getOrderDetailsAction),
      switchMap(({orderId}) =>
        this.service.getOrderDetails(orderId).pipe(
          map((orderDetails: OrderDetailsInterface) =>
            getOrderDetailsSuccessAction({orderDetails})
          ),
          catchError((errorResponse: HttpErrorResponse) => {
            return of(
              getOrderDetailsFailureAction({
                backendErrors: errorResponse.error.error,
              })
            )
          })
        )
      )
    )
  )
}
