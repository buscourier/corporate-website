import {Inject, Injectable, Injector} from '@angular/core'
import {Actions, createEffect, ofType} from '@ngrx/effects'
import {catchError, delay, map, of, switchMap} from 'rxjs'
import {HttpErrorResponse} from '@angular/common/http'
import {SiteService} from '../../../../services/site.service'
import {
  sendMessageAction,
  sendMessageFailureAction,
  sendMessageSuccessAction,
} from '../actions/send-message.action'
import {tap} from 'rxjs/operators'
import {PolymorpheusComponent} from '@tinkoff/ng-polymorpheus'
import {AlertComponent} from '../../../alert/alert.component'
import {TuiDialogService} from '@taiga-ui/core'
import {ResponseInterface} from '../../types/response.interface'

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
        this.siteService.sendToSupport(payload).pipe(
          map((response: ResponseInterface) =>
            sendMessageSuccessAction({response})
          ),
          catchError((errorResponse: HttpErrorResponse) => {
            return of(sendMessageFailureAction({errors: ''}))
          })
        )
      )
    )
  )

  success$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(sendMessageSuccessAction),
        tap(() => {
          this.dialogService
            .open<any>(
              new PolymorpheusComponent(AlertComponent, this.injector),
              {
                data: {
                  heading:
                    'Ваше сообщение отправлено. <br /> Мы свяжемся с вами в ближайшее время!',
                  success: true,
                },
                dismissible: true,
                closeable: false,
                size: 'auto',
              }
            )
            .subscribe() //TODO: unsubscribe?
        })
      ),
    {dispatch: false}
  )

  failure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(sendMessageFailureAction),
        tap(() => {
          this.dialogService
            .open<any>(
              new PolymorpheusComponent(AlertComponent, this.injector),
              {
                data: {
                  heading: 'Ваше сообщение не доставлено',
                  failure: true,
                },
                dismissible: true,
                closeable: false,
                size: 'auto',
              }
            )
            .subscribe() //TODO: unsubscribe?
        })
      ),
    {dispatch: false}
  )
}
