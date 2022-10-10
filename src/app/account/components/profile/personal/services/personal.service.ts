import {Injectable} from '@angular/core'
import {HttpClient} from '@angular/common/http'
import {Observable} from 'rxjs'
import {environment} from '../../../../../../environments/environment.prod'
import {PersonalProfileInterface} from '../types/personal-profile.interface'

@Injectable()
export class PersonalService {
  constructor(private http: HttpClient) {}

  getProfile(currentUserId: string): Observable<PersonalProfileInterface> {
    const url = '/api/account/details/'

    return this.http.get<PersonalProfileInterface>(
      `${url}/${environment.apiKey}/${currentUserId}`
    )
  }

  updateProfile(
    currentUserId: string,
    payload: any
  ): Observable<PersonalProfileInterface> {
    const url = '/api/account/details/'

    return this.http.put<PersonalProfileInterface>(
      `${url}/${environment.apiKey}/${currentUserId}`,
      payload
    )
  }
}
