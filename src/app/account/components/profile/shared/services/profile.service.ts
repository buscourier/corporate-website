import {Injectable} from '@angular/core'
import {HttpClient} from '@angular/common/http'
import {PersonalProfileInterface} from '../types/personal-profile.interface'
import {Observable} from 'rxjs'
import {environment} from '../../../../../../environments/environment.prod'
import {EntityProfileInterface} from '../types/entity-profile.interface'

@Injectable()
export class ProfileService {
  constructor(private http: HttpClient) {}

  getPersonalProfile(
    currentUserId: string
  ): Observable<PersonalProfileInterface> {
    const url = '/api/account/details/'

    return this.http.get<PersonalProfileInterface>(
      `${url}/${environment.apiKey}/${currentUserId}`
    )
  }

  getEntityProfile(currentUserId: string): Observable<EntityProfileInterface> {
    const url = '/api/account/details/'

    return this.http.get<EntityProfileInterface>(
      `${url}/${environment.apiKey}/${currentUserId}`
    )
  }

  updatePersonalProfile(
    currentUserId: string,
    payload: any
  ): Observable<PersonalProfileInterface> {
    const url = '/api/account/details/'

    return this.http.put<PersonalProfileInterface>(
      `${url}/${environment.apiKey}/${currentUserId}`,
      payload
    )
  }

  updateEntityProfile(
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
