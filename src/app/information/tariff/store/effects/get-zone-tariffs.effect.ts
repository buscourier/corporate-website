import {HttpErrorResponse} from '@angular/common/http'
import {Injectable} from '@angular/core'
import {Actions, createEffect, ofType} from '@ngrx/effects'
import {catchError, delay, map, of, switchMap} from 'rxjs'
import {TariffService} from '../../services/tariff.service'
import {ZoneTariffInterface} from '../../types/zone-tariff.interface'
import {
  getZoneTariffsAction,
  getZoneTariffsFailureAction,
  getZoneTariffsSuccessAction,
} from '../actions/get-zone-tariffs.action'

@Injectable()
export class GetZoneTariffsEffect {
  constructor(private actions$: Actions, private service: TariffService) {}

  getTariffs = createEffect(() =>
    this.actions$.pipe(
      ofType(getZoneTariffsAction),
      delay(600),
      switchMap(({id}) =>
        this.service.getZoneTariffs(id).pipe(
          map((tariffs: ZoneTariffInterface[]) =>
            getZoneTariffsSuccessAction({tariffs})
          ),
          catchError((errorResponse: HttpErrorResponse) => {
            return of(
              getZoneTariffsFailureAction({errors: errorResponse.error.error})
            )
          })
        )
      )
    )
  )
}
