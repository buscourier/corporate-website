import {HttpClient} from '@angular/common/http'
import {Injectable} from '@angular/core'
import {StartCityInterface} from '../../../../../../shared/types/start-city.interface'
import {Observable} from 'rxjs'
import {EndCityInterface} from 'src/app/shared/types/end-city.interface'
import {environment} from '../../../../../../../environments/environment'

@Injectable()
export class FilterService {
  constructor(private http: HttpClient) {}

  getStartCities(): Observable<StartCityInterface[]> {
    const url = `${environment.api_url}/calc/getcitiesfrom`

    return this.http.get<StartCityInterface[]>(url)
  }

  getEndCities(cityId: string): Observable<EndCityInterface[]> {
    const url = `${environment.api_url}/calc/getcitiesto`

    return this.http.get<EndCityInterface[]>(`${url}/${cityId}/0`)
  }
}
