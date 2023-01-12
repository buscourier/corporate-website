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

@Injectable()
export class SendOrderEffect {
  constructor(
    private actions$: Actions,
    private newOrderService: NewOrderService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  sendOrder$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(sendOrderAction),
      switchMap(({order}) => {
        return this.newOrderService.sendOrder(order).pipe(
          map((order: any) => {
            return sendOrderSuccessAction({order})
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

  sendOrderSuccess$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(sendOrderSuccessAction),
        tap(() => {
          this.router.navigate(['/new-order', 'success'])
        })
      )
    },
    {dispatch: false}
  )

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
