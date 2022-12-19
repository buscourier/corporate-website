import {Injectable} from '@angular/core'
import {Actions, createEffect, ofType} from '@ngrx/effects'
import {catchError, map, of, switchMap} from 'rxjs'
import {CitiesService} from '../../../../services/cities.service'
import {StartCityInterface} from '../../../../types/start-city.interface'
import {
  getStartCitiesAction,
  getStartCitiesFailureAction,
  getStartCitiesSuccessAction,
} from '../actions/get-start-cities.action'

@Injectable()
export class GetStartCitiesEffect {
  constructor(
    private actions$: Actions,
    private citiesService: CitiesService
  ) {}

  getStartCities = createEffect(() =>
    this.actions$.pipe(
      ofType(getStartCitiesAction),
      switchMap(() =>
        this.citiesService.getStartCities().pipe(
          map((cities: StartCityInterface[]) =>
            getStartCitiesSuccessAction({cities})
          ),
          catchError(() => of(getStartCitiesFailureAction()))
        )
      )
    )
  )
}
