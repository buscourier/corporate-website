import {OfficeInterface} from '../../../../../shared/types/office.interface'
import {
  getPointsAction,
  getPointsFailureAction,
  getPointsSuccessAction,
} from '../actions/get-points.action'
import {OfficesService} from '../../../../../shared/services/offices.service'
import {Injectable} from '@angular/core'
import {catchError, delay, map, of} from 'rxjs'
import {Actions, createEffect, ofType} from '@ngrx/effects'
import {switchMap} from 'rxjs/operators'
import {HttpErrorResponse} from '@angular/common/http'

@Injectable()
export class GetPointsEffect {
  constructor(private actions$: Actions, private service: OfficesService) {}

  getPoints$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getPointsAction),
      delay(600),
      switchMap(() =>
        this.service.getOffices().pipe(
          map((points: OfficeInterface[]) => getPointsSuccessAction({points})),
          catchError((errorResponse: HttpErrorResponse) => {
            return of(
              getPointsFailureAction({errors: errorResponse.error.error})
            )
          })
        )
      )
    )
  )
}
