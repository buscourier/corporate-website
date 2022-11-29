import {Inject, Injectable, Injector, OnDestroy} from '@angular/core'
import {Actions, createEffect, ofType} from '@ngrx/effects'
import {TuiDialogService} from '@taiga-ui/core'
import {PolymorpheusComponent} from '@tinkoff/ng-polymorpheus'
import {catchError, map, of, switchMap} from 'rxjs'
import {tap} from 'rxjs/operators'
import {AlertComponent} from 'src/app/shared/components/alert/alert.component'
import {OrdersService} from '../../../../services/orders.service'
import {
  cancelOrderAction,
  cancelOrderFailureAction,
  cancelOrderSuccessAction,
} from '../actions/cancel-order.action'

@Injectable()
export class CancelOrderEffect implements OnDestroy {
  constructor(
    private actions$: Actions,
    private ordersService: OrdersService,
    @Inject(TuiDialogService) private readonly dialogService: TuiDialogService,
    @Inject(Injector) private readonly injector: Injector
  ) {}

  ngOnDestroy(): void {
    console.log('d')
  }

  cancelOrder$ = createEffect(() =>
    this.actions$.pipe(
      ofType(cancelOrderAction),
      switchMap(({data}) =>
        this.ordersService.cancelOrder(data).pipe(
          map(() => cancelOrderSuccessAction()),
          catchError(() => of(cancelOrderFailureAction()))
        )
      )
    )
  )

  successCancel$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(cancelOrderSuccessAction),
        tap(() => {
          this.dialogService
            .open<any>(
              new PolymorpheusComponent(AlertComponent, this.injector),
              {
                data: {
                  heading: 'Заказ отменен',
                  success: true,
                },
                dismissible: true,
                closeable: false,
                size: 'auto',
              }
            )
            .subscribe()
        })
      ),
    {dispatch: false}
  )

  failureCancel$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(cancelOrderFailureAction),
        tap(() => {
          this.dialogService
            .open<any>(
              new PolymorpheusComponent(AlertComponent, this.injector),
              {
                data: {
                  heading: 'Ошибка отмены заказа',
                  failure: true,
                },
                dismissible: true,
                closeable: false,
                size: 'auto',
              }
            )
            .subscribe()
        })
      ),
    {dispatch: false}
  )
}
