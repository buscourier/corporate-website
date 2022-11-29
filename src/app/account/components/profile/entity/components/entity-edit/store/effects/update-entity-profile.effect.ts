import {Inject, Injectable, Injector} from '@angular/core'
import {Router} from '@angular/router'
import {Actions, createEffect, ofType} from '@ngrx/effects'
import {TuiDialogService} from '@taiga-ui/core'
import {PolymorpheusComponent} from '@tinkoff/ng-polymorpheus'
import {catchError, map, of, switchMap} from 'rxjs'
import {tap} from 'rxjs/operators'
import {AlertComponent} from '../../../../../../../../shared/components/alert/alert.component'
import {EntityService} from '../../../../services/entity.service'
import {EntityProfileInterface} from '../../../../types/entity-profile.interface'
import {
  updateEntityProfileAction,
  updateEntityProfileFailureAction,
  updateEntityProfileSuccessAction,
} from '../actions/update-entity-profile.action'

@Injectable()
export class UpdateEntityProfileEffect {
  constructor(
    private actions$: Actions,
    @Inject(TuiDialogService) private readonly dialogService: TuiDialogService,
    @Inject(Injector) private readonly injector: Injector,
    private entityService: EntityService,
    private router: Router
  ) {}

  //TODO: Need to refactor all arrow returns in effects
  updateProfile = createEffect(() =>
    this.actions$.pipe(
      ofType(updateEntityProfileAction),
      switchMap(({currentUserId, profileInput}) => {
        return this.entityService
          .updateProfile(currentUserId, profileInput)
          .pipe(
            map((profile: EntityProfileInterface) => {
              return updateEntityProfileSuccessAction({profile})
            }),
            catchError(() => {
              return of(
                updateEntityProfileFailureAction({
                  errors: 'Упс, не удалось обновить данные пользователя',
                })
              )
            })
          )
      })
    )
  )

  successUpdate$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(updateEntityProfileSuccessAction),
        tap(() => {
          // this.dialogService
          //   .open<any>(
          //     new PolymorpheusComponent(AlertComponent, this.injector),
          //     {
          //       data: {
          //         heading: 'Данные обновлены',
          //         success: true,
          //       },
          //       dismissible: true,
          //       closeable: false,
          //       size: 'auto',
          //     }
          //   )
          //   .subscribe() //TODO: unsubscribe?
          this.router.navigate(['/account', 'profile', 'entity'])
        })
      ),
    {dispatch: false}
  )

  failureUpdate$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(updateEntityProfileFailureAction),
        tap(() => {
          this.dialogService
            .open<any>(
              new PolymorpheusComponent(AlertComponent, this.injector),
              {
                data: {
                  heading: 'Данные не обновлены',
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
