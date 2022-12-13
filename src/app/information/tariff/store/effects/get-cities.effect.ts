import {HttpErrorResponse} from '@angular/common/http'
import {Injectable} from '@angular/core'
import {Actions, createEffect, ofType} from '@ngrx/effects'
import {catchError, delay, map, of, switchMap} from 'rxjs'
import {CitiesService} from '../../../../shared/services/cities.service'
import {StartCityInterface} from '../../../../shared/types/start-city.interface'
import {
  getCitiesAction,
  getCitiesFailureAction,
  getCitiesSuccessAction,
} from '../actions/get-cities.action'

@Injectable()
export class GetCitiesEffect {
  constructor(private actions$: Actions, private service: CitiesService) {}

  getCities = createEffect(() =>
    this.actions$.pipe(
      ofType(getCitiesAction),
      delay(600),
      switchMap(() =>
        this.service.getStartCities().pipe(
          map((cities: StartCityInterface[]) =>
            getCitiesSuccessAction({cities})
          ),
          catchError((errorResponse: HttpErrorResponse) => {
            return of(
              getCitiesFailureAction({errors: errorResponse.error.error})
            )
          })
        )
      )
    )
  )
}
