import {HttpClient} from '@angular/common/http'
import {Injectable} from '@angular/core'
import {environment} from '../../../../../environments/environment.prod'
import {OrdersInputInterface} from '../types/orders-input.interface'

@Injectable()
export class OrdersService {
  constructor(private http: HttpClient) {}

  getOrders(ordersInput: OrdersInputInterface) {
    const url = '/api/order/getorders/'

    return this.http.post(
      `${url}/getorders`,
      JSON.stringify({
        'api-key': environment.apiKey,
        'user-id': ordersInput['user-id'],
        'start-date': ordersInput['start-date'],
        'end-date': ordersInput['end-date'],
        'start-city': ' 1',
        'end-city': '-1',
        'elements-on-page': '30',
        'page-num': '1',
      })
    )
  }

  getOrderDetails(id: string) {
    const url = '/api/order/getdetails/'

    return this.http.get(`${url}/${environment.apiKey}/${id}`)
  }
}
