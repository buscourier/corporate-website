//TODO: replace by this service all fetch of cities in project

import {HttpClient} from '@angular/common/http'
import {Injectable} from '@angular/core'
import {Observable} from 'rxjs'
import {environment} from '../../../environments/environment'
import {OrderStatusInterface} from '../types/order-status.interface'

@Injectable()
export class FindOrderService {
  url = `${environment.apiUrl}/order`

  constructor(private http: HttpClient) {}

  getStatuses(orderNumber: string): Observable<OrderStatusInterface[]> {
    return this.http.get<OrderStatusInterface[]>(
      `${this.url}/gettracking/${environment.apiKey}/${orderNumber}`
    )
  }
}
