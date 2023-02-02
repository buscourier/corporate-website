import {Injectable} from '@angular/core'
import {ActivatedRoute, Router} from '@angular/router'
import {Actions, createEffect, ofType} from '@ngrx/effects'
import {catchError, delay, map, of, switchMap} from 'rxjs'
import {tap} from 'rxjs/operators'
import {NewOrderService} from '../../../../shared/services/new-order.service'
import {
  sendOrderAction,
  sendOrderFailureAction,
  sendOrderSuccessAction,
} from '../actions/send-order.action'
import {BackendErrorsInterface} from '../../../../../shared/types/backend-errors.interface'
import {Store} from '@ngrx/store'
import {sendWebhookAction} from '../actions/send-webhook.action'
import {NewOrderResponseInterface} from '../../types/new-order-response.interface'
import {HttpErrorResponse} from '@angular/common/http'

@Injectable()
export class SendOrderEffect {
  constructor(
    private actions$: Actions,
    private newOrderService: NewOrderService,
    private route: ActivatedRoute,
    private router: Router,
    private store: Store
  ) {}

  sendOrder$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(sendOrderAction),
      delay(1000),
      switchMap(({order}) => {
        return this.newOrderService.sendOrder(order).pipe(
          map((order: NewOrderResponseInterface) => {
            return sendOrderSuccessAction({order})
          }),
          catchError((backendErrors: HttpErrorResponse) => {
            return of(
              sendOrderFailureAction({
                backendErrors: backendErrors,
              })
            )
          })
        )
      })
    )
  })

  sendOrderSuccess$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(sendOrderSuccessAction),
      switchMap(({order}) => {
        return of(sendWebhookAction({order}))
      })
    )
  })

  sendOrderFailure$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(sendOrderFailureAction),
        tap(() => {
          this.router.navigate(['/new-order', 'checkout', 'failure'])
        })
      )
    },
    {dispatch: false}
  )
}
