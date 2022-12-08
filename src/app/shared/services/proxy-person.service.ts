import {HttpClient} from '@angular/common/http'
import {Injectable} from '@angular/core'
import {Observable} from 'rxjs'
import {environment} from '../../../environments/environment'
import {ProxyPersonInterface} from '../types/proxy-person.interface'

@Injectable()
export class ProxyPersonService {
  constructor(private http: HttpClient) {}

  getProxy(userId: string): Observable<ProxyPersonInterface[]> {
    const url = `${environment.apiUrl}/account/contactperson`

    return this.http.get<ProxyPersonInterface[]>(
      `${url}/${environment.apiKey}/${userId}`
    )
  }
}
