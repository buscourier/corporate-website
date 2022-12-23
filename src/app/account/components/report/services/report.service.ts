import {HttpClient} from '@angular/common/http'
import {Injectable} from '@angular/core'
import {map, Observable} from 'rxjs'
import {environment} from '../../../../../environments/environment'
import {OrderCancelInputInterface} from '../types/order-cancel-input.interface'
import {OrderInterface} from '../types/order.interface'
import {ReportInputInterface} from '../types/report-input.interface'
import {ReportResponseInterface} from '../types/report-response.interface'

@Injectable()
export class ReportService {
  constructor(private http: HttpClient) {}

  getOrders(
    reportInput: ReportInputInterface
  ): Observable<ReportResponseInterface> {
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
      .post<ReportResponseInterface>(
        `${url}/getorders`,
        JSON.stringify(payload)
      )
      .pipe(
        map((response: ReportResponseInterface) => {
          const orders = response.orders.map((order: OrderInterface) => {
            return {
              ...order,
              date: order.date.split(' ')[0],
            }
          })

          return {
            ...response,
            orders,
          }
        })
      )
  }

  getOrderDetails(id: string): Observable<any> {
    const url = `${environment.apiUrl}/order/getdetails`

    return this.http.get(`${url}/${environment.apiKey}/${id}`)
  }

  cancelOrder(input: OrderCancelInputInterface) {
    const url = `${environment.apiUrl}/order/ordercancel`
    return this.http.post(`${url}`, JSON.stringify(input))
  }
}
