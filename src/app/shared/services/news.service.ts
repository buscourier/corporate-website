import {HttpClient} from '@angular/common/http'
import {Injectable} from '@angular/core'
import {filter, map, Observable, of} from 'rxjs'
import {concatAll, toArray} from 'rxjs/operators'
import {environment} from '../../../environments/environment'
import {EndCityInterface} from '../types/end-city.interface'
import {StartCityInterface} from '../types/start-city.interface'
import {NewsItemInterface} from '../types/news-item.interface'

@Injectable()
export class NewsService {
  private url = `${environment.apiUrl}/news`

  constructor(private http: HttpClient) {}
}
