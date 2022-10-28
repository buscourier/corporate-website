import {Inject, Injectable} from '@angular/core'
import {Actions, createEffect, ofType} from '@ngrx/effects'
import {TuiAlertService, TuiNotification} from '@taiga-ui/core'
import {catchError, map, of, switchMap} from 'rxjs'
import {tap} from 'rxjs/operators'
import {PersonalService} from '../../../../services/personal.service'
import {PersonalProfileInterface} from '../../../../types/personal-profile.interface'
import {
  updatePersonalProfileAction,
  updatePersonalProfileFailureAction,
  updatePersonalProfileSuccessAction,
} from '../actions/update-personal-profile.action'

@Injectable()
export class UpdatePersonalProfileEffect {
  constructor(
    private actions$: Actions,
    @Inject(TuiAlertService)
    private readonly alertService: TuiAlertService,
    private personalService: PersonalService
  ) {}

  updateProfile = createEffect(() =>
    this.actions$.pipe(
      ofType(updatePersonalProfileAction),
      switchMap(({currentUserId, profileInput}) => {
        return this.personalService
          .updateProfile(currentUserId, profileInput)
          .pipe(
            map((profile: PersonalProfileInterface) => {
              return updatePersonalProfileSuccessAction({profile})
            }),
            catchError(() => {
              return of(
                updatePersonalProfileFailureAction({
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
        ofType(updatePersonalProfileSuccessAction),
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
        ofType(updatePersonalProfileFailureAction),
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
