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
}
