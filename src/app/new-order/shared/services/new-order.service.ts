import {HttpClient} from '@angular/common/http'
import {Injectable} from '@angular/core'
import {Observable} from 'rxjs'
import {environment} from '../../../../environments/environment'
import {EndCityInterface} from '../../../shared/types/end-city.interface'
import {OfficeInterface} from '../../../shared/types/office.interface'
import {StartCityInterface} from '../../../shared/types/start-city.interface'
import {CargoInterface} from '../types/cargo.interface'
import {ServiceInterface} from '../types/service.interface'

@Injectable()
export class NewOrderService {
  private readonly url = `${environment.apiUrl}/calc/`

  constructor(private http: HttpClient) {}

  getStartCities(): Observable<StartCityInterface[]> {
    return this.http.get<StartCityInterface[]>(`${this.url}/getcitiesfrom`)
  }

  getEndCities(cityId: string): Observable<EndCityInterface[]> {
    return this.http.get<EndCityInterface[]>(
      `${this.url}/getcitiesfrom/${cityId}/0`
    )
  }

  getOffices(): Observable<OfficeInterface[]> {
    return this.http.get<OfficeInterface[]>(`${this.url}/getoffices`)
  }

  getCargo(cityFromId: string, cityToId: string): Observable<CargoInterface[]> {
    return this.http.get<CargoInterface[]>(
      `${this.url}/gettypes/${cityFromId}/${cityToId}`
    )
  }

  getServices(cityFromId: string): Observable<ServiceInterface[]> {
    return this.http.get<ServiceInterface[]>(
      `${this.url}/getservices/${cityFromId}`
    )
  }

  calculate() {}
}
