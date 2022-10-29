import {Injectable} from '@angular/core'
import {Actions, createEffect, ofType} from '@ngrx/effects'
import {catchError, map, of, switchMap} from 'rxjs'
import {EndCityInterface} from '../../../../../../shared/types/end-city.interface'
import {NewOrderService} from '../../../../services/new-order.service'
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
      switchMap(({cityId}) =>
        this.newOrderService.getEndCities(cityId).pipe(
          map((cities: EndCityInterface[]) => getCitiesSuccessAction({cities})),
          catchError((error: string) => of(getCitiesFailureAction({error})))
        )
      )
    )
  )
}
