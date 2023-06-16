import {Actions, createEffect, ofType} from '@ngrx/effects'
import {SiteService} from '../../../../../shared/services/site.service'
import {
  getAchievementsAction,
  getAchievementsFailureAction,
  getAchievementsSuccessAction,
} from '../actions/get-achievements.action'
import {catchError, map, of, switchMap} from 'rxjs'
import {Injectable} from '@angular/core'
import {BackendErrorsInterface} from '../../../../../shared/types/backend-errors.interface'
import {AchievementsInterface} from '../../types/achievements.interface'

@Injectable()
export class GetAchievementsEffect {
  getData$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(getAchievementsAction),
      switchMap(() => {
        return this.siteService.getAchievements().pipe(
          map((data: AchievementsInterface) => {
            return getAchievementsSuccessAction({data})
          }),
          catchError((backendErrors: BackendErrorsInterface) => {
            return of(getAchievementsFailureAction({backendErrors}))
          })
        )
      })
    )
  })

  constructor(private actions$: Actions, private siteService: SiteService) {}
}
