import {SiteService} from '../../../shared/services/site.service'
import {
  getMarkupAction,
  getMarkupFailureAction,
  getMarkupSuccessAction,
} from '../actions/get-markup.action'
import {Injectable} from '@angular/core'
import {catchError, map, of, switchMap} from 'rxjs'
import {Actions, createEffect, ofType} from '@ngrx/effects'
import {HttpErrorResponse} from '@angular/common/http'

@Injectable()
export class GetMarkupEffect {
  constructor(private actions$: Actions, private service: SiteService) {}

  getMarkup$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(getMarkupAction),
      switchMap(() => {
        return this.service.getPolicy().pipe(
          map((markup: string) => {
            return getMarkupSuccessAction({markup})
          }),
          catchError((errorResponse: HttpErrorResponse) => {
            //TODO: refactor errors in all effects
            return of(
              getMarkupFailureAction({backendErrors: errorResponse.error.error})
            )
          })
        )
      })
    )
  })
}
