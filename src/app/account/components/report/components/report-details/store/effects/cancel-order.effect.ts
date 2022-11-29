import {Inject, Injectable} from '@angular/core'
import {Actions, createEffect, ofType} from '@ngrx/effects'
import {TuiAlertService} from '@taiga-ui/core'
import {catchError, map, of, switchMap} from 'rxjs'
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
    @Inject(TuiAlertService)
    private readonly alertService: TuiAlertService,
    private reportService: ReportService
  ) {}

  cancelOrder$ = createEffect(() =>
    this.actions$.pipe(
      ofType(cancelOrderAction),
      switchMap(({data}) =>
        this.reportService.cancelOrder(data).pipe(
          map(() => cancelOrderSuccessAction()),
          catchError(() => of(cancelOrderFailureAction()))
        )
      )
    )
  )

  // successCancel$ = createEffect(
  //   () =>
  //     this.actions$.pipe(
  //       ofType(cancelOrderSuccessAction),
  //       tap(() => {
  //         this.dialogService
  //           .open<any>(
  //             new PolymorpheusComponent(AlertComponent, this.injector),
  //             {
  //               data: {
  //                 heading: 'Заказ отменен',
  //                 success: true,
  //               },
  //               dismissible: true,
  //               closeable: false,
  //               size: 'auto',
  //             }
  //           )
  //           .subscribe()
  //       })
  //     ),
  //   {dispatch: false}
  // )
  //
  // failureCancel$ = createEffect(
  //   () =>
  //     this.actions$.pipe(
  //       ofType(cancelOrderFailureAction),
  //       tap(() => {
  //         this.dialogService
  //           .open<any>(
  //             new PolymorpheusComponent(AlertComponent, this.injector),
  //             {
  //               data: {
  //                 heading: 'Ошибка отмены заказа',
  //                 failure: true,
  //               },
  //               dismissible: true,
  //               closeable: false,
  //               size: 'auto',
  //             }
  //           )
  //           .subscribe()
  //       })
  //     ),
  //   {dispatch: false}
  // )
}
