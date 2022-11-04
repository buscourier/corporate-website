import {Injectable} from '@angular/core'
import {Actions, createEffect, ofType} from '@ngrx/effects'
import {catchError, map, of, switchMap} from 'rxjs'
import {StartCityInterface} from 'src/app/shared/types/start-city.interface'
import {NewOrderService} from '../../../../services/new-order.service'
import {citiesLoadedAction} from '../actions/cities-loaded.action'
import {
  getCitiesAction,
  getCitiesFailureAction,
  getCitiesSuccessAction,
} from '../actions/get-cities.action'

@Injectable()
export class GetCitiesEffect {
  constructor(
    private actions$: Actions,
    private newOrderService: NewOrderService
  ) {}

  getCities = createEffect(() =>
    this.actions$.pipe(
      ofType(getCitiesAction),
      switchMap(() =>
        this.newOrderService.getStartCities().pipe(
          map((cities: StartCityInterface[]) =>
            getCitiesSuccessAction({cities})
          ),
          catchError((error: string) => of(getCitiesFailureAction({error})))
        )
      )
    )
  )

  afterSuccessCitiesLoading$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getCitiesSuccessAction),
      map(() => citiesLoadedAction({isCitiesLoaded: true}))
    )
  )
}
