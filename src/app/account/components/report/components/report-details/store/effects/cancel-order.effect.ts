import {Inject, Injectable} from '@angular/core'
import {Actions, createEffect, ofType} from '@ngrx/effects'
import {catchError, map, of, switchMap} from 'rxjs'
import {
  cancelOrderAction,
  cancelOrderFailureAction,
  cancelOrderSuccessAction,
} from '../actions/cancel-order.action'
import {ReportService} from '../../../../services/report.service'
import {tap} from 'rxjs/operators'
import {TuiAlertService, TuiNotification} from '@taiga-ui/core'

@Injectable()
export class CancelOrderEffect {
  constructor(
    private actions$: Actions,
    @Inject(TuiAlertService)
    private readonly alertService: TuiAlertService,
    private reportService: ReportService
  ) {}

  cancelOrder$ = createEffect(() =>
    this.actions$.pipe(
      ofType(cancelOrderAction),
      switchMap(({order}) =>
        this.reportService.cancelOrder(order).pipe(
          map(() => cancelOrderSuccessAction()),
          catchError(() => of(cancelOrderFailureAction()))
        )
      )
    )
  )

  afterSuccessCancel$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(cancelOrderSuccessAction),
        tap(() => {
          this.alertService
            .open(`Заказ успешно отменен`, {
              label: `Изменения данных!`,
              status: TuiNotification.Success,
            })
            .subscribe()
        })
      ),
    {dispatch: false}
  )

  afterFailureCancel$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(cancelOrderFailureAction),
        tap(() => {
          this.alertService
            .open(`Ошибка отменены заказа`, {
              label: `Изменения данных!`,
              status: TuiNotification.Error,
            })
            .subscribe()
        })
      ),
    {dispatch: false}
  )
}
