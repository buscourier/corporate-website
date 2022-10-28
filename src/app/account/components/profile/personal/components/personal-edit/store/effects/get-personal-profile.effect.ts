import {Injectable} from '@angular/core'
import {Actions, createEffect, ofType} from '@ngrx/effects'
import {catchError, map, of, switchMap} from 'rxjs'
import {PersonalService} from '../../../../services/personal.service'
import {PersonalProfileInterface} from '../../../../types/personal-profile.interface'
import {
  getPersonalProfileAction,
  getPersonalProfileFailureAction,
  getPersonalProfileSuccessAction,
} from '../actions/get-personal-profile.action'

@Injectable()
export class GetPersonalProfileEffect {
  constructor(
    private actions$: Actions,
    private personalService: PersonalService
  ) {}

  getPersonalProfile$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getPersonalProfileAction),
      switchMap(({userId}) => {
        return this.personalService.getProfile(userId).pipe(
          map((profile: PersonalProfileInterface) =>
            getPersonalProfileSuccessAction({profile})
          ),
          catchError(() => of(getPersonalProfileFailureAction()))
        )
      })
    )
  )
}
