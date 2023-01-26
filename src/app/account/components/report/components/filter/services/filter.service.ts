import {HttpClient} from '@angular/common/http'
import {Injectable} from '@angular/core'
import {filter, map, Observable} from 'rxjs'
import {concatAll, toArray} from 'rxjs/operators'
import {EndCityInterface} from 'src/app/shared/types/end-city.interface'
import {environment} from '../../../../../../../environments/environment'
import {StartCityInterface} from '../../../../../../shared/types/start-city.interface'

@Injectable()
export class FilterService {
  constructor(private http: HttpClient) {}

  getStartCities(): Observable<StartCityInterface[]> {
    const url = `${environment.apiUrl}/calc/getcitiesfrom`

    return this.http.get<StartCityInterface[]>(url).pipe(
      concatAll(),
      filter((city: StartCityInterface) => {
        return city.id !== '249'
      }),
      toArray(),
      map((cities: StartCityInterface[]) => {
        return cities.sort((a: StartCityInterface, b: StartCityInterface) => {
          return a.name.localeCompare(b.name)
        })
      })
    )
  }

  getEndCities(cityId: string): Observable<EndCityInterface[]> {
    const url = `${environment.apiUrl}/calc/getcitiesto`

    return this.http.get<EndCityInterface[]>(`${url}/${cityId}/0`).pipe(
      map((cities: EndCityInterface[]) => {
        return cities.sort((a: EndCityInterface, b: EndCityInterface) => {
          return a.name.localeCompare(b.name)
        })
      })
    )
  }
}
