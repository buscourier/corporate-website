import {HttpErrorResponse} from '@angular/common/http'
import {Inject, Injectable, Injector} from '@angular/core'
import {Actions, createEffect, ofType} from '@ngrx/effects'
import {TuiDialogService} from '@taiga-ui/core'
import {PolymorpheusComponent} from '@tinkoff/ng-polymorpheus'
import {catchError, map, of, switchMap, take} from 'rxjs'
import {tap} from 'rxjs/operators'
import {AlertComponent} from '../../../../../../../shared/components/alert/alert.component'
import {ReportService} from '../../../../services/report.service'
import {
  cancelOrderAction,
  cancelOrderFailureAction,
  cancelOrderSuccessAction,
} from '../actions/cancel-order.action'

@Injectable()
export class CancelOrderEffect {
  constructor(
    private actions$: Actions,
    @Inject(TuiDialogService) private readonly dialogService: TuiDialogService,
    @Inject(Injector) private readonly injector: Injector,
    private reportService: ReportService
  ) {}

  cancelOrder$ = createEffect(() =>
    this.actions$.pipe(
      ofType(cancelOrderAction),
      switchMap(({input}) =>
        this.reportService.cancelOrder(input).pipe(
          map(() => cancelOrderSuccessAction()),
          catchError((errorResponse: HttpErrorResponse) => {
            return of(
              cancelOrderFailureAction({
                backendErrors: errorResponse.error || errorResponse.message,
              })
            )
          })
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
            .pipe(take(1))
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
            .pipe(take(1))
            .subscribe()
        })
      ),
    {dispatch: false}
  )
}
