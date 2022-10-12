import {Injectable} from '@angular/core'
import {
  getEndCitiesAction,
  getEndCitiesFailureAction,
  getEndCitiesSuccessAction,
} from '../actions/get-end-cities.action'
import {Actions, createEffect, ofType} from '@ngrx/effects'
import {catchError, map, of, switchMap} from 'rxjs'
import {FilterService} from '../../services/filter.service'
import {EndCityInterface} from '../../../../../../../shared/types/end-city.interface'

@Injectable()
export class GetEndCitiesEffect {
  constructor(
    private actions$: Actions,
    private filterService: FilterService
  ) {}

  getEndCities = createEffect(() =>
    this.actions$.pipe(
      ofType(getEndCitiesAction),
      switchMap(({cityId}) =>
        this.filterService.getEndCities(cityId).pipe(
          map((cities: EndCityInterface[]) =>
            getEndCitiesSuccessAction({cities})
          ),
          catchError(() => of(getEndCitiesFailureAction()))
        )
      )
    )
  )
}
