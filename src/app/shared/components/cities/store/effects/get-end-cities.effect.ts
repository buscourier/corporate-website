import {Injectable} from '@angular/core'
import {Actions, createEffect, ofType} from '@ngrx/effects'
import {catchError, map, of, switchMap} from 'rxjs'
import {CitiesService} from '../../../../services/cities.service'
import {EndCityInterface} from '../../../../types/end-city.interface'
import {
  getEndCitiesAction,
  getEndCitiesFailureAction,
  getEndCitiesSuccessAction,
} from '../actions/get-end-cities.action'

@Injectable()
export class GetEndCitiesEffect {
  constructor(
    private actions$: Actions,
    private citiesService: CitiesService
  ) {}

  getEndCities = createEffect(() =>
    this.actions$.pipe(
      ofType(getEndCitiesAction),
      switchMap(({cityId}) =>
        this.citiesService.getEndCities(cityId).pipe(
          map((cities: EndCityInterface[]) =>
            getEndCitiesSuccessAction({cities})
          ),
          catchError(() => of(getEndCitiesFailureAction()))
        )
      )
    )
  )
}
