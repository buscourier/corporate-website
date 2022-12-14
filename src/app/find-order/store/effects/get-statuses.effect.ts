import {HttpErrorResponse} from '@angular/common/http'
import {Injectable} from '@angular/core'
import {Actions, createEffect, ofType} from '@ngrx/effects'
import {catchError, delay, map, of, switchMap} from 'rxjs'
import {FindOrderService} from '../../services/find-order.service'
import {OrderStatusInterface} from '../../types/order-status.interface'
import {
  getStatusesAction,
  getStatusesFailureAction,
  getStatusesSuccessAction,
} from '../actions/get-statuses.action'

@Injectable()
export class GetStatusesEffect {
  constructor(private actions$: Actions, private service: FindOrderService) {}

  getStatuses$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getStatusesAction),
      delay(600),
      switchMap(({orderNumber}) =>
        this.service.getStatuses(orderNumber).pipe(
          map((statuses: OrderStatusInterface[]) =>
            getStatusesSuccessAction({statuses})
          ),
          catchError((errorResponse: HttpErrorResponse) => {
            return of(
              getStatusesFailureAction({errors: errorResponse.error.error})
            )
          })
        )
      )
    )
  )
}
