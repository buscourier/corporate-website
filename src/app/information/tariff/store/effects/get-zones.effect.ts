import {HttpErrorResponse} from '@angular/common/http'
import {Injectable} from '@angular/core'
import {Actions, createEffect, ofType} from '@ngrx/effects'
import {catchError, map, of, switchMap} from 'rxjs'
import {TariffService} from '../../services/tariff.service'
import {ZoneInterface} from '../../types/zone.interface'
import {
  getZonesAction,
  getZonesFailureAction,
  getZonesSuccessAction,
} from '../actions/get-zones.action'

@Injectable()
export class GetZonesEffect {
  constructor(private actions$: Actions, private service: TariffService) {}

  getZones = createEffect(() =>
    this.actions$.pipe(
      ofType(getZonesAction),
      switchMap(({id}) =>
        this.service.getZones(id).pipe(
          map((zones: ZoneInterface[]) => getZonesSuccessAction({zones})),
          catchError((errorResponse: HttpErrorResponse) => {
            return of(
              getZonesFailureAction({errors: errorResponse.error.error})
            )
          })
        )
      )
    )
  )
}
