import {Inject, Injectable, Injector} from '@angular/core'
import {Actions, createEffect, ofType} from '@ngrx/effects'
import {Store} from '@ngrx/store'
import {TuiDialogService} from '@taiga-ui/core'
import {PolymorpheusComponent} from '@tinkoff/ng-polymorpheus'
import {catchError, map, of, switchMap} from 'rxjs'
import {tap} from 'rxjs/operators'
import {AlertComponent} from '../../../../../shared/components/alert/alert.component'
import {SiteService} from '../../../../../shared/services/site.service'
import {BackendErrorsInterface} from '../../../../../shared/types/backend-errors.interface'
import {WebhookInterface} from '../../../../../shared/types/webhook.interface'
import {clearFormAction} from '../actions/clear-form'
import {
  sendWebhookAction,
  sendWebhookFailureAction,
  sendWebhookSuccessAction,
} from '../actions/send-webhook.action'

@Injectable()
export class SendWebhookEffect {
  constructor(
    private actions$: Actions,
    private siteService: SiteService,
    private store: Store,
    @Inject(TuiDialogService) private readonly dialogService: TuiDialogService,
    @Inject(Injector) private readonly injector: Injector
  ) {}

  sendWebhook$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(sendWebhookAction),
      switchMap(({payload}) => {
        return this.siteService.sendToBitrix(payload).pipe(
          map((response: WebhookInterface) => {
            return sendWebhookSuccessAction({response})
          }),
          catchError((backendErrors: BackendErrorsInterface) => {
            return of(sendWebhookFailureAction({backendErrors}))
          })
        )
      })
    )
  })

  success$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(sendWebhookSuccessAction),
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
        }),
        switchMap(() => {
          this.store.dispatch(clearFormAction())
          return of(null)
        })
      ),
    {dispatch: false}
  )

  failure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(sendWebhookFailureAction),
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
