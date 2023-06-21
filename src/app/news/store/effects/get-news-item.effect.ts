import {Injectable} from '@angular/core'
import {switchMap} from 'rxjs/operators'
import {Actions, createEffect, ofType} from '@ngrx/effects'
import {NewsItemInterface} from '../../../shared/types/news-item.interface'
import {catchError, map, of} from 'rxjs'
import {NewsService} from '../../../shared/services/news.service'
import {BackendErrorsInterface} from '../../../shared/types/backend-errors.interface'
import {
  getNewsAction,
  getNewsFailureAction,
  getNewsSuccessAction,
} from '../actions/get-news.action'
import {SiteService} from '../../../shared/services/site.service'
import {
  getNewsItemAction,
  getNewsItemFailureAction,
  getNewsItemSuccessAction,
} from '../actions/get-news-item.action'

@Injectable()
export class GetNewsItemEffect {
  getNewsItem$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(getNewsItemAction),
      switchMap(({id}) => {
        return this.siteService.getNewsItem(id).pipe(
          map((currentItem: NewsItemInterface) => {
            return getNewsItemSuccessAction({currentItem})
          }),
          catchError((backendErrors: BackendErrorsInterface) => {
            return of(getNewsItemFailureAction({backendErrors}))
          })
        )
      })
    )
  })

  constructor(private actions$: Actions, private siteService: SiteService) {}
}
