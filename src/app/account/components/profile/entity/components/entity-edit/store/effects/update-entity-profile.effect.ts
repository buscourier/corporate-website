import {Actions, createEffect, ofType} from '@ngrx/effects'
import {Injectable} from '@angular/core'
import {catchError, map, of, switchMap} from 'rxjs'
import {EntityService} from '../../../../services/entity.service'
import {
  updateEntityProfileAction,
  updateEntityProfileFailureAction,
  updateEntityProfileSuccessAction,
} from '../actions/update-entity-profile.action'
import {EntityProfileInterface} from '../../../../types/entity-profile.interface'

@Injectable()
export class UpdatePersonalProfileEffect {
  constructor(
    private actions$: Actions,
    private entityService: EntityService
  ) {}

  updateEntityProfile = createEffect(() =>
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
}
