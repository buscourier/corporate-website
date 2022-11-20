import {HttpClient} from '@angular/common/http'
import {Injectable} from '@angular/core'
import {map, Observable, of, zip} from 'rxjs'
import {environment} from '../../../../../environments/environment'

interface TotalSumInterface {
  price: number
}

@Injectable()
export class TotalSumService {
  private readonly url = `${environment.apiUrl}/calc`

  constructor(private http: HttpClient) {}

  calculateTotalSum(
    startCityId,
    endCityId,
    startCourierId,
    endCourierId,
    orders
  ) {
    const ordersSum = []

    if (!orders) {
      return of(null)
    }

    orders.forEach((order) => {
      ordersSum.push(
        this.calculateOrderSum(
          startCityId,
          endCityId,
          startCourierId,
          endCourierId,
          order
        )
      )
    })

    return zip(...ordersSum).pipe(
      map((prices: Array<TotalSumInterface>) => {
        const success = prices.every(({price}: TotalSumInterface) => price > 0)
        let totalSum: any

        if (success) {
          totalSum = prices.reduce((sum: number, {price}) => {
            return sum + price
          }, 0)
        } else {
          totalSum = 0
        }

        return totalSum
      })
    )
  }

  calculateOrderSum(
    startCityId,
    endCityId,
    startCourierId,
    endCourierId,
    order
  ) {
    if (!order) {
      // return new Observable<TotalSumInterface>();
      return
    }

    console.log('order!!!', order)
  }

  getResult<T>(
    startCityId: string,
    endCityId: string,
    cargoId: string,
    serviceIds: string[] | null = null,
    weight: any = null,
    dim: any = null
  ): Observable<TotalSumInterface> {
    return this.http.get<TotalSumInterface>(
      `${this.url}/calc/${startCityId}/${endCityId}/${cargoId}/${serviceIds}/${weight}/${dim}`
    )
  }
}
