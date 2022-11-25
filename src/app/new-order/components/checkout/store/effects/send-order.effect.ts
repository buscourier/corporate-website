import {Injectable} from '@angular/core'
import {Actions, createEffect, ofType} from '@ngrx/effects'
import {catchError, map, of, switchMap} from 'rxjs'
import {NewOrderService} from '../../../../shared/services/new-order.service'
import {
  sendOrderAction,
  sendOrderFailureAction,
  sendOrderSuccessAction,
} from '../actions/send-order.action'

@Injectable()
export class SendOrderEffect {
  constructor(
    private actions$: Actions,
    private newOrderService: NewOrderService
  ) {}

  sendOrder$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(sendOrderAction),
      switchMap(({order}) => {
        return this.newOrderService.sendOrder(order).pipe(
          map(() => {
            return sendOrderSuccessAction()
          }),
          catchError(() => {
            return of(
              sendOrderFailureAction({
                errors: 'Не удалось сохранить заказ',
              })
            )
          })
        )
      })
    )
  })
}
