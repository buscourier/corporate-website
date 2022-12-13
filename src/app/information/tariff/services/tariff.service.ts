//TODO: replace by this service all fetch of cities in project

import {HttpClient} from '@angular/common/http'
import {Injectable} from '@angular/core'
import {Observable} from 'rxjs'
import {environment} from '../../../../environments/environment'
import {ZoneTariffInterface} from '../types/zone-tariff.interface'
import {ZoneInterface} from '../types/zone.interface'

@Injectable()
export class TariffService {
  url = `${environment.apiUrl}/site`

  constructor(private http: HttpClient) {}

  getZones(id: string): Observable<ZoneInterface[]> {
    return this.http.get<ZoneInterface[]>(`${this.url}/zones/${id}`)
  }

  getZoneTariffs(id: string): Observable<ZoneTariffInterface[]> {
    return this.http.get<ZoneTariffInterface[]>(`${this.url}/zonetariffs/${id}`)
  }
}
