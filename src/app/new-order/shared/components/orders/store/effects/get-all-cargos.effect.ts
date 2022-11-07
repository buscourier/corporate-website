import {Injectable} from '@angular/core'
import {Actions, createEffect, ofType} from '@ngrx/effects'
import {catchError, map, of, switchMap} from 'rxjs'
import {CargoInterface} from 'src/app/new-order/shared/types/cargo.interface'
import {NewOrderService} from '../../../../services/new-order.service'
import {allCargosLoadedAction} from '../actions/all-cargos-loaded.action'
import {
  getAllCargosAction,
  getAllCargosFailureAction,
  getAllCargosSuccessAction,
} from '../actions/get-all-cargos.action'

@Injectable()
export class GetAllCargosEffect {
  constructor(
    private actions$: Actions,
    private newOrderService: NewOrderService
  ) {}

  getAllCargos$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getAllCargosAction),
      switchMap(({startCityId, endCityId}) =>
        this.newOrderService.getCargos(startCityId, endCityId).pipe(
          map((cargos: CargoInterface[]) =>
            getAllCargosSuccessAction({cargos})
          ),
          catchError((errors: string) =>
            of(getAllCargosFailureAction({errors}))
          )
        )
      )
    )
  )

  afterSuccessCargosLoading$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getAllCargosSuccessAction),
      map(() => allCargosLoadedAction({loaded: true}))
    )
  )
}
