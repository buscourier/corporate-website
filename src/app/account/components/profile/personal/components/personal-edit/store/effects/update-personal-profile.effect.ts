import {Actions, createEffect, ofType} from '@ngrx/effects'
import {Injectable} from '@angular/core'
import {
  updatePersonalProfileAction,
  updatePersonalProfileFailureAction,
  updatePersonalProfileSuccessAction,
} from '../actions/update-personal-profile.action'
import {catchError, map, of, switchMap} from 'rxjs'
import {PersonalService} from '../../../../services/personal.service'
import {PersonalProfileInterface} from '../../../../types/personal-profile.interface'

@Injectable()
export class UpdatePersonalProfileEffect {
  constructor(
    private actions$: Actions,
    private personalService: PersonalService
  ) {}

  updatePersonalProfile = createEffect(() =>
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
}
