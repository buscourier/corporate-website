//TODO: replace by this service all fetch of cities in project

import {HttpClient} from '@angular/common/http'
import {Injectable} from '@angular/core'
import {map, Observable} from 'rxjs'
import {environment} from '../../../environments/environment'
import {OrderStatusInterface} from '../types/order-status.interface'

@Injectable()
export class FindOrderService {
  url = `${environment.apiUrl}/order`

  constructor(private http: HttpClient) {}

  getStatuses(
    orderNumber: string
  ): Observable<OrderStatusInterface[] | string> {
    return this.http
      .get<OrderStatusInterface[] | string>(
        `${this.url}/gettracking/${environment.apiKey}/${orderNumber}`
      )
      .pipe(
        map((data: OrderStatusInterface[] | string) => {
          if (typeof data === 'string') {
            throw new Error('Заказ не найден')
          } else {
            return data
          }
        })
      )
  }
}
