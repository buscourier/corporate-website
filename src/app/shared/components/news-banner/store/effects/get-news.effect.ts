import {Injectable} from '@angular/core'
import {Actions, createEffect, ofType} from '@ngrx/effects'
import {NewsService} from '../../../../services/news.service'
import {
  getNewsAction,
  getNewsFailureAction,
  getNewsSuccessAction,
} from '../actions/get-news.action'
import {catchError, map, of, switchMap} from 'rxjs'
import {ArticleInterface} from '../../../../types/article.interface'
import {BackendErrorsInterface} from '../../../../types/backend-errors.interface'

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
