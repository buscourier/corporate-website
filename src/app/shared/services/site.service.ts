import {HttpClient} from '@angular/common/http'
import {Injectable} from '@angular/core'
import {Observable} from 'rxjs'
import {environment} from '../../../environments/environment'
import {EndCityInterface} from '../types/end-city.interface'
import {StartCityInterface} from '../types/start-city.interface'
import {tap} from 'rxjs/operators'

@Injectable()
export class SiteService {
  url = `${environment.apiUrl}/site`

  constructor(private http: HttpClient) {}

  sendToSupport(payload): Observable<any> {
    const extPayload = {
      'api-key': environment.apiKey,
      ...payload,
    }

    return this.http.post<any>(`${this.url}/mailer`, JSON.stringify(extPayload))
  }

  getPolicy<T>(): Observable<T> {
    const api = '8aab09f6-c5b3-43be-8895-153ea164984e/53'

    return this.http.get<T>(`${this.url}/page/${api}`)
  }
}
