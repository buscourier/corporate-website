import {Actions, createEffect, ofType} from '@ngrx/effects'
import {SiteService} from '../../../shared/services/site.service'
import {
  getDocumentsAction,
  getDocumentsFailureAction,
  getDocumentsSuccessAction,
} from '../actions/get-documents.action'
import {catchError, map, of, switchMap} from 'rxjs'
import {DocumentInterface} from '../../../shared/types/document.interface'
import {HttpErrorResponse} from '@angular/common/http'
import {Injectable} from '@angular/core'

@Injectable()
export class GetDocumentsEffect {
  getDocument$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(getDocumentsAction),
      switchMap(() => {
        return this.siteService.getDocuments().pipe(
          map((documents: DocumentInterface[]) => {
            return getDocumentsSuccessAction({documents})
          }),
          catchError((errorResponse: HttpErrorResponse) => {
            return of(
              getDocumentsFailureAction({
                backendErrors: errorResponse.error.error,
              })
            )
          })
        )
      })
    )
  })

  constructor(private actions$: Actions, private siteService: SiteService) {}
}
