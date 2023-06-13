import {Injectable} from '@angular/core'
import {switchMap} from 'rxjs/operators'
import {Actions, createEffect, ofType} from '@ngrx/effects'
import {ArticleInterface} from '../../../shared/types/article.interface'
import {catchError, map, of} from 'rxjs'
import {NewsService} from '../../../shared/services/news.service'
import {BackendErrorsInterface} from '../../../shared/types/backend-errors.interface'
import {
  getNewsAction,
  getNewsFailureAction,
  getNewsSuccessAction,
} from '../actions/get-news.action'

@Injectable()
export class GetNewsEffect {
  getNews$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(getNewsAction),
      switchMap(() => {
        return this.newsService.getArticles().pipe(
          map((news: ArticleInterface[]) => {
            return getNewsSuccessAction({news})
          }),
          catchError((backendErrors: BackendErrorsInterface) => {
            return of(getNewsFailureAction({backendErrors}))
          })
        )
      })
    )
  })

  constructor(private actions$: Actions, private newsService: NewsService) {}
}
