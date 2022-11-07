import {Injectable} from '@angular/core'
import {Actions, createEffect, ofType} from '@ngrx/effects'
import {catchError, map, of, switchMap} from 'rxjs'
import {NewOrderService} from '../../../../services/new-order.service'
import {ServiceInterface} from '../../../../types/service.interface'
import {allServicesLoadedAction} from '../actions/all-services-loaded.action'
import {
  getAllServicesAction,
  getAllServicesFailureAction,
  getAllServicesSuccessAction,
} from '../actions/get-all-services.action'

@Injectable()
export class GetAllServicesEffect {
  constructor(
    private actions$: Actions,
    private newOrderService: NewOrderService
  ) {}

  getAllCargos$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getAllServicesAction),
      switchMap(({startCityId}) =>
        this.newOrderService.getServices(startCityId).pipe(
          map((services: ServiceInterface[]) =>
            getAllServicesSuccessAction({services})
          ),
          catchError((errors: string) =>
            of(getAllServicesFailureAction({errors}))
          )
        )
      )
    )
  )

  afterSuccessServicesLoading$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getAllServicesSuccessAction),
      map(() => allServicesLoadedAction({loaded: true}))
    )
  )
}
