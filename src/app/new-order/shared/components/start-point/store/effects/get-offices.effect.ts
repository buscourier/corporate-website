import {Injectable} from '@angular/core'
import {Actions, createEffect, ofType} from '@ngrx/effects'
import {catchError, map, of, switchMap} from 'rxjs'
import {OfficeInterface} from '../../../../../../shared/types/office.interface'
import {NewOrderService} from '../../../../services/new-order.service'
import {
  getOfficesAction,
  getOfficesFailureAction,
  getOfficesSuccessAction,
} from '../actions/get-offices.action'

@Injectable()
export class GetOfficesEffect {
  constructor(
    private actions$: Actions,
    private newOrderService: NewOrderService
  ) {}

  getOffices = createEffect(() =>
    this.actions$.pipe(
      ofType(getOfficesAction),
      switchMap(({id}) =>
        this.newOrderService.getOffices(id).pipe(
          map((offices: OfficeInterface[]) =>
            getOfficesSuccessAction({offices})
          ),
          catchError((error: string) => of(getOfficesFailureAction({error})))
        )
      )
    )
  )
}
