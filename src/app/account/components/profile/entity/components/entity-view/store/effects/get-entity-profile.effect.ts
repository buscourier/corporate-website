import {Injectable} from '@angular/core'
import {Actions, createEffect, ofType} from '@ngrx/effects'
import {catchError, map, of, switchMap} from 'rxjs'
import {EntityService} from '../../../../services/entity.service'
import {PersonalProfileInterface} from '../../../../../personal/types/personal-profile.interface'
import {
  getEntityProfileAction,
  getEntityProfileFailureAction,
  getEntityProfileSuccessAction,
} from '../actions/get-entity-profile.action'

@Injectable()
export class GetEntityProfileEffect {
  constructor(
    private actions$: Actions,
    private entityService: EntityService
  ) {}

  getEntityProfile$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getEntityProfileAction),
      switchMap(({userId}) => {
        return this.entityService.getProfile(userId).pipe(
          map((profile: PersonalProfileInterface) =>
            getEntityProfileSuccessAction({profile})
          ),
          catchError(() => of(getEntityProfileFailureAction()))
        )
      })
    )
  )
}
