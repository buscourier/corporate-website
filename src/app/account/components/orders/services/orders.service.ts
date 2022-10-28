import {HttpClient} from '@angular/common/http'
import {Injectable} from '@angular/core'
import {map, Observable} from 'rxjs'
import {concatAll, toArray} from 'rxjs/operators'
import {environment} from '../../../../../environments/environment'
import {OrderInterface} from '../types/order.interface'
import {OrdersInputInterface} from '../types/orders-input.interface'

@Injectable()
export class OrdersService {
  constructor(private http: HttpClient) {}

  getOrders(ordersInput: OrdersInputInterface): Observable<OrderInterface[]> {
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
      ...ordersInput,
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
    const url = `${environment.apiUrl}/order/getdetails/`

    return this.http.get(`${url}/${environment.apiKey}/${id}`)
  }

  cancelOrder(order: OrderInterface) {
    const url = `${environment.apiUrl}/order/ordercancel/`

    return this.http.post(`${url}`, JSON.stringify(order))
  }
}
