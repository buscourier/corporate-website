import {HttpClient} from '@angular/common/http'
import {Injectable} from '@angular/core'
import {environment} from '../../../../../environments/environment.prod'
import {OrdersInputInterface} from '../types/orders-input.interface'

@Injectable()
export class OrdersService {
  constructor(private http: HttpClient) {}

  getOrders(ordersInput: OrdersInputInterface) {
    const url = '/api/order/getorders/'

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

    console.log('ordersInput', ordersInput)
    console.log('payload', payload)

    return this.http.post(`${url}/getorders`, JSON.stringify(payload))
  }

  getOrderDetails(id: string) {
    const url = '/api/order/getdetails/'

    return this.http.get(`${url}/${environment.apiKey}/${id}`)
  }
}
