import {HttpClient} from '@angular/common/http'
import {Injectable} from '@angular/core'
import {filter, Observable} from 'rxjs'
import {concatAll, toArray} from 'rxjs/operators'
import {environment} from '../../../../environments/environment'
import {EndCityInterface} from '../../../shared/types/end-city.interface'
import {OfficeInterface} from '../../../shared/types/office.interface'
import {StartCityInterface} from '../../../shared/types/start-city.interface'
import {NewOrderInputInterface} from '../../components/checkout/types/new-order-input.interface'
import {NewOrderResponseInterface} from '../../components/checkout/types/new-order-response.interface'
import {CargoInterface} from '../types/cargo.interface'
import {ServiceInterface} from '../types/service.interface'

@Injectable()
export class NewOrderService {
  private readonly url = `${environment.apiUrl}/calc`

  constructor(private http: HttpClient) {}

  getStartCities(): Observable<StartCityInterface[]> {
    return this.http.get<StartCityInterface[]>(`${this.url}/getcitiesfrom`)
  }

  getEndCities(startCityId: string): Observable<EndCityInterface[]> {
    return this.http.get<EndCityInterface[]>(
      `${this.url}/getcitiesto/${startCityId}/0`
    )
  }

  getOffices(id: string): Observable<OfficeInterface[]> {
    return this.http.get<OfficeInterface[]>(`${this.url}/getoffices`).pipe(
      concatAll(),
      filter((office: OfficeInterface) => {
        return office.office_id === id
      }),
      toArray()
    )
  }

  getCargos(
    cityFromId: string,
    cityToId: string
  ): Observable<CargoInterface[]> {
    return this.http.get<CargoInterface[]>(
      `${this.url}/gettypes/${cityFromId}/${cityToId}`
    )
  }

  getServices(cityFromId: string): Observable<ServiceInterface[]> {
    return this.http.get<ServiceInterface[]>(
      `${this.url}/getservices/${cityFromId}`
    )
  }

  sendOrder(
    order: NewOrderInputInterface
  ): Observable<NewOrderResponseInterface> {
    const url = `${environment.apiUrl}`

    return this.http.post<NewOrderResponseInterface>(
      `${url}/orde/`,
      JSON.stringify(order)
    )
  }
}
