import {HttpErrorResponse} from '@angular/common/http'
import {Injectable} from '@angular/core'
import {Actions, createEffect, ofType} from '@ngrx/effects'
import {catchError, delay, map, of} from 'rxjs'
import {switchMap} from 'rxjs/operators'
import {OfficesService} from '../../../../../shared/services/offices.service'
import {OfficeInterface} from '../../../../../shared/types/office.interface'
import {
  getDepartmentsAction,
  getDepartmentsFailureAction,
  getDepartmentsSuccessAction,
} from '../actions/get-departments.action'

@Injectable()
export class GetDepartmentsEffect {
  constructor(private actions$: Actions, private service: OfficesService) {}

  getDepartments$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getDepartmentsAction),
      delay(600),
      switchMap(() =>
        this.service.getOffices().pipe(
          map((departments: OfficeInterface[]) =>
            getDepartmentsSuccessAction({departments})
          ),
          catchError((errorResponse: HttpErrorResponse) => {
            return of(
              getDepartmentsFailureAction({errors: errorResponse.error.error})
            )
          })
        )
      )
    )
  )
}
