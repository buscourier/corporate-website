import {HttpClient} from '@angular/common/http'
import {Injectable} from '@angular/core'
import {map, Observable} from 'rxjs'
import {concatAll, toArray} from 'rxjs/operators'
import {environment} from '../../../../../environments/environment'
import {OrderCancelInputInterface} from '../components/report-details/types/order-cancel-input.interface'
import {OrderInterface} from '../types/order.interface'
import {ReportInputInterface} from '../types/report-input.interface'

@Injectable()
export class ReportService {
  constructor(private http: HttpClient) {}

  getOrders(reportInput: ReportInputInterface): Observable<OrderInterface[]> {
    const url = `${environment.apiUrl}/order/getorders/`

    const payload = {
      'api-key': environment.apiKey,
      'user-id': null,
      'start-date': null,
      'end-date': null,
      'start-city': null,
      'end-city': null,
      'elements-on-page': '10',
      'page-num': '1',
      ...reportInput,
    }

    return this.http
      .post<OrderInterface[]>(`${url}/getorders`, JSON.stringify(payload))
      .pipe(
        concatAll(),
        map((order: OrderInterface) => {
          return {
            ...order,
            date: order.date.split(' ')[0],
          }
        }),
        toArray()
      )
  }

  getOrderDetails(id: string): Observable<any> {
    const url = `${environment.apiUrl}/order/getdetails`

    return this.http.get(`${url}/${environment.apiKey}/${id}`)
  }

  cancelOrder(data: OrderCancelInputInterface) {
    const url = `${environment.apiUrl}/order/ordercancel`

    return this.http.post(`${url}`, JSON.stringify(data))
  }
}
