import {HttpClient} from '@angular/common/http'
import {Injectable} from '@angular/core'
import {Observable} from 'rxjs'
import {environment} from '../../../environments/environment'
import {ProfileInterface} from '../../account/components/profile/shared/types/profile.interface'

@Injectable()
export class ProxyPersonService {
  constructor(private http: HttpClient) {}

  getProxies(currentUserId: string): Observable<any> {
    const url = `${environment.apiUrl}/account/contactperson`

    return this.http.get<ProfileInterface[]>(
      `${url}/${environment.apiKey}/${currentUserId}`
    )
  }
}
