import {HttpClient} from '@angular/common/http'
import {Injectable} from '@angular/core'
import {filter, map, Observable} from 'rxjs'
import {environment} from '../../../../../../environments/environment'
import {ProfileInterface} from '../../shared/types/profile.interface'
import {PersonalProfileInterface} from '../types/personal-profile.interface'

@Injectable()
export class PersonalService {
  constructor(private http: HttpClient) {}

  getProfile(currentUserId: string): Observable<PersonalProfileInterface> {
    const url = `/api/account/details`

    return this.http
      .get<ProfileInterface[]>(`${url}/${environment.apiKey}/${currentUserId}`)
      .pipe(
        filter(Boolean),
        map((profile: ProfileInterface[]) => {
          return [...profile].reduce((obj, item: ProfileInterface) => {
            return {
              ...obj,
              [item.alias]: item,
            }
          }, {})
        })
      )
  }

  updateProfile(
    currentUserId: string,
    profileInput: any
  ): Observable<PersonalProfileInterface> {
    const url = `${environment.apiUrl}/account/details`

    return this.http.put<PersonalProfileInterface>(
      `${url}/${environment.apiKey}/${currentUserId}`,
      profileInput
    )
  }
}
