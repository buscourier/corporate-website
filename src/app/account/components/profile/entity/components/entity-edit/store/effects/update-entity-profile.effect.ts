import {Actions, createEffect, ofType} from '@ngrx/effects'
import {Inject, Injectable} from '@angular/core'
import {catchError, map, of, switchMap} from 'rxjs'
import {EntityService} from '../../../../services/entity.service'
import {
  updateEntityProfileAction,
  updateEntityProfileFailureAction,
  updateEntityProfileSuccessAction,
} from '../actions/update-entity-profile.action'
import {EntityProfileInterface} from '../../../../types/entity-profile.interface'
import {tap} from 'rxjs/operators'
import {TuiAlertService, TuiNotification} from '@taiga-ui/core'

@Injectable()
export class UpdateEntityProfileEffect {
  constructor(
    private actions$: Actions,
    @Inject(TuiAlertService)
    private readonly alertService: TuiAlertService,
    private entityService: EntityService
  ) {}

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

  afterSuccessUpdate$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(updateEntityProfileSuccessAction),
        tap(() => {
          this.alertService
            .open(`Данные успешно сохранены`, {
              label: `Изменения данных!`,
              status: TuiNotification.Success,
            })
            .subscribe()
        })
      ),
    {dispatch: false}
  )

  afterFailureUpdate$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(updateEntityProfileFailureAction),
        tap(() => {
          this.alertService
            .open(`Ошибка сохранения данных`, {
              label: `Изменения данных!`,
              status: TuiNotification.Error,
            })
            .subscribe()
        })
      ),
    {dispatch: false}
  )
}
