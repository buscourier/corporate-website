import {Injectable} from '@angular/core'
import {HttpClient} from '@angular/common/http'
import {Observable} from 'rxjs'
import {environment} from '../../../../../../environments/environment.prod'
import {EntityProfileInterface} from '../types/entity-profile.interface'

@Injectable()
export class ProfileService {
  constructor(private http: HttpClient) {}

  getProfile(currentUserId: string): Observable<EntityProfileInterface> {
    const url = '/api/account/details/'

    return this.http.get<EntityProfileInterface>(
      `${url}/${environment.apiKey}/${currentUserId}`
    )
  }

  updateProfile(
    currentUserId: string,
    payload: any
  ): Observable<EntityProfileInterface> {
    const url = '/api/account/details/'

    return this.http.put<EntityProfileInterface>(
      `${url}/${environment.apiKey}/${currentUserId}`,
      payload
    )
  }
}
