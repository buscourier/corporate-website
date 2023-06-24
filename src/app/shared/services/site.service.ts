import {HttpClient, HttpParams} from '@angular/common/http'
import {Injectable} from '@angular/core'
import {map, Observable, of} from 'rxjs'
import {tap} from 'rxjs/operators'
import {environment} from '../../../environments/environment'
import {WindowInterface} from '../types/window.interface'
import {NewsItemInterface} from '../types/news-item.interface'

@Injectable()
export class SiteService {
  url = `${environment.apiUrl}/site`

  constructor(private http: HttpClient) {}

  sendToSupport(subject, payload): Observable<any> {
    const extPayload = {
      'api-key': environment.apiKey,
      subject,
      ...payload,
    }

    return this.http.post<any>(`${this.url}/mailer`, JSON.stringify(extPayload))
  }

  getPolicy<T>(): Observable<T> {
    const api = '8aab09f6-c5b3-43be-8895-153ea164984e/53'

    return this.http.get<T>(`${this.url}/page/${api}`)
  }

  sendFormToBitrix(formName, payload) {
    const params = new HttpParams({
      fromObject: {
        'fields[TITLE]': formName,
        'fields[NAME]': payload.name,
        'fields[PHONE][0][VALUE_TYPE]': 'WORK',
        'fields[PHONE][0][VALUE]': payload.phone,
        'fields[EMAIL][0][VALUE_TYPE]': 'WORK',
        'fields[EMAIL][0][VALUE]': payload.email,
        'fields[SOURCE_ID]': 'UC_90HLMC',
        'fields[COMMENTS]': payload.message,
        'fields[TRACE]': payload.trace,
      },
    })

    return this.http.get(
      `https://bitrix.busbox.guru/rest/1/xk0350plspumy30m/crm.lead.add`,
      {params}
    )
  }

  getDocuments<T>(): Observable<T> {
    return this.http.get<T>(`${this.url}/documents`)
  }

  getAchievements<T>(): Observable<any> {
    // return this.http.get<T>(`${this.url}/achievements`)
    return of({
      parcelsCount: '1 062 000',
    })
  }

  getNews<T>(): Observable<NewsItemInterface[]> {
    return this.http.get<NewsItemInterface[]>(`${this.url}/news`)
  }

  getNewsItem<T>(id: string): Observable<NewsItemInterface> {
    return this.http
      .get<NewsItemInterface[]>(`${this.url}/news/${id}`)
      .pipe(map((data: NewsItemInterface[]) => data[0]))
  }
}
