import {Injectable} from '@angular/core'
import {ActivatedRoute, Router} from '@angular/router'
import {Actions, createEffect, ofType} from '@ngrx/effects'
import {catchError, map, of, switchMap} from 'rxjs'
import {tap} from 'rxjs/operators'
import {NewOrderService} from '../../../../shared/services/new-order.service'
import {
  sendOrderAction,
  sendOrderFailureAction,
  sendOrderSuccessAction,
} from '../actions/send-order.action'
import {
  sendWebhookAction,
  sendWebhookFailureAction,
  sendWebhookSuccessAction,
} from '../actions/send-webhook.action'
import {WebhookInterface} from '../../../../../shared/types/webhook.interface'
import {BackendErrorsInterface} from '../../../../../shared/types/backend-errors.interface'
import {HttpErrorResponse} from '@angular/common/http'

@Injectable()
export class SendWebhookEffect {
  constructor(
    private actions$: Actions,
    private newOrderService: NewOrderService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  sendWebhook$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(sendWebhookAction),
      switchMap(({order}) => {
        console.log('web hook')
        return this.newOrderService.sendOrderToBitrix(order).pipe(
          map((response: WebhookInterface) => {
            return sendWebhookSuccessAction({response})
          }),
          catchError((backendErrors: HttpErrorResponse) => {
            console.log('backendErrors', backendErrors)

            return of(
              sendWebhookFailureAction({
                backendErrors,
              })
            )
          })
        )
      })
    )
  })

  sendWebhookSuccess$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(sendWebhookSuccessAction),
        tap(() => {
          this.router.navigate(['/new-order', 'success'])
        })
      )
    },
    {dispatch: false}
  )

  sendWebhookFailure$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(sendWebhookFailureAction),
        tap(() => {
          console.log('sendWebhookFailure')
          this.router.navigate(['/new-order', 'checkout', 'failure'])
        })
      )
    },
    {dispatch: false}
  )
}
