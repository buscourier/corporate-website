import {HttpClient} from '@angular/common/http'
import {Injectable} from '@angular/core'
import {filter, map, Observable} from 'rxjs'
import {concatAll, toArray} from 'rxjs/operators'
import {environment} from '../../../environments/environment'
import {EndCityInterface} from '../types/end-city.interface'
import {StartCityInterface} from '../types/start-city.interface'

//TODO: replace by this service all fetch of cities in project

@Injectable()
export class CitiesService {
  constructor(private http: HttpClient) {}

  getStartCities(): Observable<StartCityInterface[]> {
    const url = `${environment.apiUrl}/calc/getcitiesfrom`

    return this.http.get<StartCityInterface[]>(url).pipe(
      concatAll(),
      filter((city: StartCityInterface) => {
        return city.id !== '249'
      }),
      toArray()
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
