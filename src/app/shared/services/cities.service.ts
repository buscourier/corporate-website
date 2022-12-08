import {HttpClient} from '@angular/common/http'
import {Injectable} from '@angular/core'
import {Observable} from 'rxjs'
import {environment} from '../../../environments/environment'
import {EndCityInterface} from '../types/end-city.interface'
import {StartCityInterface} from '../types/start-city.interface'

//TODO: replace by this service all fetch of cities in project

@Injectable()
export class CitiesService {
  constructor(private http: HttpClient) {}

  getStartCities(): Observable<StartCityInterface[]> {
    const url = `${environment.apiUrl}/calc/getcitiesfrom`

    return this.http.get<StartCityInterface[]>(url)
  }

  getEndCities(cityId: string): Observable<EndCityInterface[]> {
    const url = `${environment.apiUrl}/calc/getcitiesto`

    return this.http.get<EndCityInterface[]>(`${url}/${cityId}/0`)
  }
}
