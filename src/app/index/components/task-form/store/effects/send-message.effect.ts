import {HttpErrorResponse} from '@angular/common/http'
import {Inject, Injectable, Injector} from '@angular/core'
import {Actions, createEffect, ofType} from '@ngrx/effects'
import {TuiDialogService} from '@taiga-ui/core'
import {PolymorpheusComponent} from '@tinkoff/ng-polymorpheus'
import {catchError, delay, map, of, switchMap} from 'rxjs'
import {tap} from 'rxjs/operators'
import {AlertComponent} from '../../../../../shared/components/alert/alert.component'
import {SiteService} from '../../../../../shared/services/site.service'
import {BackendErrorsInterface} from '../../../../../shared/types/backend-errors.interface'
import {ResponseInterface} from '../../types/response.interface'
import {
  sendMessageAction,
  sendMessageFailureAction,
  sendMessageSuccessAction,
} from '../actions/send-message.action'

@Injectable()
export class SendMessageEffect {
  constructor(
    private actions$: Actions,
    private siteService: SiteService,
    @Inject(TuiDialogService) private readonly dialogService: TuiDialogService,
    @Inject(Injector) private readonly injector: Injector
  ) {}

  sendMessage$ = createEffect(() =>
    this.actions$.pipe(
      ofType(sendMessageAction),
      delay(1000),
      switchMap(({payload}) =>
        this.siteService
          .sendToSupport('Форма нестандартной задачи', payload)
          .pipe(
            map((response: ResponseInterface) =>
              sendMessageSuccessAction({response})
            ),
            catchError((backendErrors: BackendErrorsInterface) => {
              return of(sendMessageFailureAction({backendErrors}))
            })
          )
      )
    )
  )

  // success$ = createEffect(
  //   () =>
  //     this.actions$.pipe(
  //       ofType(sendMessageSuccessAction),
  //       tap(() => {
  //         this.dialogService
  //           .open<any>(
  //             new PolymorpheusComponent(AlertComponent, this.injector),
  //             {
  //               data: {
  //                 heading:
  //                   'Ваше сообщение отправлено. <br /> Мы свяжемся с вами в ближайшее время!',
  //                 success: true,
  //               },
  //               dismissible: true,
  //               closeable: false,
  //               size: 'auto',
  //             }
  //           )
  //           .subscribe() //TODO: unsubscribe?
  //       })
  //     ),
  //   {dispatch: false}
  // )
  //
  // failure$ = createEffect(
  //   () =>
  //     this.actions$.pipe(
  //       ofType(sendMessageFailureAction),
  //       tap(() => {
  //         this.dialogService
  //           .open<any>(
  //             new PolymorpheusComponent(AlertComponent, this.injector),
  //             {
  //               data: {
  //                 heading: 'Ваше сообщение не доставлено',
  //                 failure: true,
  //               },
  //               dismissible: true,
  //               closeable: false,
  //               size: 'auto',
  //             }
  //           )
  //           .subscribe() //TODO: unsubscribe?
  //       })
  //     ),
  //   {dispatch: false}
  // )
}
