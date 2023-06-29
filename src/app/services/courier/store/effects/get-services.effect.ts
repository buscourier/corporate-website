import {Injectable} from '@angular/core'
import {Actions, createEffect, ofType} from '@ngrx/effects'
import {SiteService} from '../../../../shared/services/site.service'
import {
  getServicesAction,
  getServicesFailureAction,
  getServicesSuccessAction,
} from '../actions/get-services.action'
import {catchError, map, of, switchMap} from 'rxjs'
import {CourierServiceInterface} from '../../types/courier-service.interface'
import {BackendErrorsInterface} from '../../../../shared/types/backend-errors.interface'

@Injectable()
export class GetServicesEffect {
  getServices$ = createEffect(() => {
    return this.actions.pipe(
      ofType(getServicesAction),
      switchMap(() => {
        return this.siteService.getCourierServices().pipe(
          map((services: CourierServiceInterface[]) => {
            return getServicesSuccessAction({services})
          }),
          catchError((backendErrors: BackendErrorsInterface) => {
            return of(getServicesFailureAction({backendErrors}))
          })
        )
      })
    )
  })

  constructor(private actions: Actions, private siteService: SiteService) {}
}
