import {HttpErrorResponse} from '@angular/common/http'
import {Injectable} from '@angular/core'
import {Actions, createEffect, ofType} from '@ngrx/effects'
import {catchError, map, of, switchMap} from 'rxjs'
import {OfficeInterface} from 'src/app/shared/types/office.interface'
import {ContactsService} from '../../services/contacts.service'
import {
  getOfficesAction,
  getOfficesFailureAction,
  getOfficesSuccessAction,
} from '../actions/get-offices.action'

@Injectable()
export class GetOfficesEffect {
  constructor(private actions: Actions, private service: ContactsService) {}

  getOffices$ = createEffect(() => {
    return this.actions.pipe(
      ofType(getOfficesAction),
      switchMap(() => {
        return this.service.getOffices().pipe(
          map((offices: OfficeInterface[]) => {
            return getOfficesSuccessAction({offices})
          }),
          catchError((errorResponse: HttpErrorResponse) => {
            return of(
              getOfficesFailureAction({errors: errorResponse.error.error})
            )
          })
        )
      })
    )
  })
}
