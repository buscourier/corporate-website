import {HttpClient} from '@angular/common/http'
import {Injectable} from '@angular/core'
import {Observable} from 'rxjs'
import {tap} from 'rxjs/operators'
import {environment} from '../../../environments/environment'

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

  sendTaskFormToBitrix(payload) {
    return this.http.get(
      `https://bitrix.busbox.guru/rest/1/xk0350plspumy30m/crm.lead.add?fields[TITLE]=Форма описания нестандартной задачи&fields[NAME]=${
        payload.name
      }&fields[PHONE][0][VALUE_TYPE]=WORK&fields[PHONE][0][VALUE]=${
        payload.phone
      }&fields[EMAIL][0][VALUE_TYPE]=WORK&fields[EMAIL][0][VALUE]=${
        payload.email
      }&fields[SOURCE_ID]=UC_90HLMC&fields[COMMENTS]=${
        payload.message
      }&fields[TRACE]=${JSON.parse(payload.trace)}`
    )
  }

  sendSupportFormToBitrix(payload) {
    return this.http.get(
      `https://bitrix.busbox.guru/rest/1/xk0350plspumy30m/crm.lead.add?fields[TITLE]=Support form&fields[NAME]=${
        payload.name
      }&fields[PHONE][0][VALUE_TYPE]=WORK&fields[PHONE][0][VALUE]=${
        payload.phone
      }&fields[EMAIL][0][VALUE_TYPE]=WORK&fields[EMAIL][0][VALUE]=${
        payload.email
      }&fields[SOURCE_ID]=UC_90HLMC&fields[COMMENTS]=${
        payload.message
      }&fields[TRACE]=${JSON.parse(payload.trace)}`
    )
  }

  sendFeedbackFormToBitrix(payload) {
    return this.http.get(
      `https://bitrix.busbox.guru/rest/1/xk0350plspumy30m/crm.lead.add?fields[TITLE]=Форма на странице обратной связи&fields[NAME]=${
        payload.name
      }&fields[PHONE][0][VALUE_TYPE]=WORK&fields[PHONE][0][VALUE]=${
        payload.phone
      }&fields[EMAIL][0][VALUE_TYPE]=WORK&fields[EMAIL][0][VALUE]=${
        payload.email
      }&fields[SOURCE_ID]=UC_90HLMC&fields[COMMENTS]=${
        payload.message
      }&fields[TRACE]=${JSON.parse(payload.trace)}`
    )
  }
}
