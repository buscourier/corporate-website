import {HttpClient} from '@angular/common/http'
import {Injectable} from '@angular/core'
import {filter, map, Observable, of} from 'rxjs'
import {concatAll, toArray} from 'rxjs/operators'
import {environment} from '../../../environments/environment'
import {EndCityInterface} from '../types/end-city.interface'
import {StartCityInterface} from '../types/start-city.interface'
import {ArticleInterface} from '../types/article.interface'

@Injectable()
export class NewsService {
  private url = `${environment.apiUrl}/news`

  constructor(private http: HttpClient) {}

  getArticles(): Observable<ArticleInterface[]> {
    console.log('news')
    // return this.http.get<ArticleInterface[]>(this.url)
    return of([
      {
        id: '1',
        title: 'Новость 1',
        text: 'Some description 1',
      },
      {
        id: '2',
        title: 'Новость 2',
        text: 'Some description 2',
      },
      {
        id: '3',
        title: 'Новость 3',
        text: 'Some description 3',
      },
    ])
  }

  getArticleById(): Observable<ArticleInterface[]> {
    return this.http.get<ArticleInterface[]>(this.url)
  }
}
