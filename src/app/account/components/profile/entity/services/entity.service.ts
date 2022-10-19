import {Injectable} from '@angular/core'
import {HttpClient} from '@angular/common/http'
import {filter, map, Observable} from 'rxjs'
import {environment} from '../../../../../../environments/environment.prod'
import {EntityProfileInterface} from '../types/entity-profile.interface'
import {ProfileInterface} from '../../shared/types/profile.interface'

@Injectable()
export class EntityService {
  constructor(private http: HttpClient) {}

  getProfile(currentUserId: string): Observable<EntityProfileInterface> {
    const url = '/account/details/'

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
  ): Observable<EntityProfileInterface> {
    const url = '/account/details/'

    return this.http.put<EntityProfileInterface>(
      `${url}/${environment.apiKey}/${currentUserId}`,
      profileInput
    )
  }
}
