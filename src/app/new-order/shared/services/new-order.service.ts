import {HttpClient} from '@angular/common/http'
import {Injectable} from '@angular/core'
import {filter, map, Observable} from 'rxjs'
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
    return this.http
      .get<StartCityInterface[]>(`${this.url}/getcitiesfrom`)
      .pipe(
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

  getEndCities(startCityId: string): Observable<EndCityInterface[]> {
    return this.http
      .get<EndCityInterface[]>(`${this.url}/getcitiesto/${startCityId}/0`)
      .pipe(
        map((cities: EndCityInterface[]) => {
          return cities.sort((a: EndCityInterface, b: EndCityInterface) => {
            return a.name.localeCompare(b.name)
          })
        })
      )
  }

  getOffices(id: string): Observable<OfficeInterface[]> {
    return this.http.get<OfficeInterface[]>(`${this.url}/getoffices`).pipe(
      concatAll(),
      filter((office: OfficeInterface) => {
        return office.office_id === id
      }),
      map((office: OfficeInterface) => {
        return {
          ...office,
          geo_x: Number(office.geo_x),
          geo_y: Number(office.geo_y),
        }
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
      `${url}/order/`,
      JSON.stringify(order)
    )
  }

  sendOrderToBitrix(payload) {
    return this.http.get(
      `https://bitrix.busbox.guru/rest/1/xk0350plspumy30m/crm.lead.add?fields[TITLE]=Форма нового заказа&fields[NAME]=${payload.sender_name}&fields[PHONE][0][VALUE_TYPE]=WORK&fields[PHONE][0][VALUE]=${payload.sender_phone}&fields[SOURCE_ID]=UC_90HLMC&fields[COMMENTS]=${payload.note}&fields[TRACE]=${payload.trace}`
    )
  }
}
