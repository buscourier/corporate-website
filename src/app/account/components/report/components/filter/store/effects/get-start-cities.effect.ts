import {Injectable} from '@angular/core'
import {Actions, createEffect, ofType} from '@ngrx/effects'
import {catchError, map, of, switchMap} from 'rxjs'
import {StartCityInterface} from 'src/app/shared/types/start-city.interface'
import {FilterService} from '../../services/filter.service'
import {
  getStartCitiesAction,
  getStartCitiesFailureAction,
  getStartCitiesSuccessAction,
} from '../actions/get-start-cities.action'

@Injectable()
export class GetStartCitiesEffect {
  constructor(
    private actions$: Actions,
    private filterService: FilterService
  ) {}

  getStartCities = createEffect(() =>
    this.actions$.pipe(
      ofType(getStartCitiesAction),
      switchMap(() =>
        this.filterService.getStartCities().pipe(
          map((cities: StartCityInterface[]) =>
            getStartCitiesSuccessAction({cities})
          ),
          catchError(() => of(getStartCitiesFailureAction()))
        )
      )
    )
  )
}
