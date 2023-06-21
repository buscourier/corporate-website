import {Injectable} from '@angular/core'
import {Actions, createEffect, ofType} from '@ngrx/effects'
import {NewsService} from '../../../../services/news.service'
import {
  getNewsAction,
  getNewsFailureAction,
  getNewsSuccessAction,
} from '../actions/get-news.action'
import {catchError, map, of, switchMap} from 'rxjs'
import {NewsItemInterface} from '../../../../types/news-item.interface'
import {BackendErrorsInterface} from '../../../../types/backend-errors.interface'
import {SiteService} from '../../../../services/site.service'

@Injectable()
export class GetNewsEffect {
  getNews$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(getNewsAction),
      switchMap(() => {
        return this.siteService.getNews().pipe(
          map((news: NewsItemInterface[]) => {
            return getNewsSuccessAction({news})
          }),
          catchError((backendErrors: BackendErrorsInterface) => {
            return of(getNewsFailureAction({backendErrors}))
          })
        )
      })
    )
  })

  constructor(private actions$: Actions, private siteService: SiteService) {}
}
