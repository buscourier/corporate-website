import {HttpClient} from '@angular/common/http'
import {Injectable} from '@angular/core'
import {map, Observable, of, zip} from 'rxjs'
import {OrderStateInterface} from 'src/app/new-order/shared/components/order/types/order-state.interface'
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
    if (!order || !order.cargo.type) {
      // return new Observable<TotalSumInterface>();
      return
    }

    let cargo = ``

    //TODO: refactor after validation well be ok
    switch (order.cargo.type.id) {
      case '1':
        cargo = `${order.cargo.type.id}, ${order.cargo.value}`
        break
      // case '2':
      //   const parcels = order.cargo.value ? order.cargo.value.parcels : []
      //   break
      case '5':
      case '21':
        cargo = order.cargo.value
          ? `${order.cargo.value.detail.id}, ${order.cargo.value?.places}`
          : null
        break
    }

    const servicesId = this.getServicesId(order)
    const parcels = order.cargo.value ? order.cargo.value.parcels : []

    console.log('order!!!', order)
    console.log('cargo', cargo)
  }

  getServicesId({packages, services}: OrderStateInterface) {
    const packageIds = this.getPackageIds(packages)

    return []
  }

  getPackageIds(packages: any) {
    let arr: any[] = Object.values(packages)

    arr = arr
      .reduce((acc, val) => acc.concat(val), [])
      .filter((obj) => {
        const isCheckboxActive = Object.entries(obj)[0][1]

        return isCheckboxActive && obj.count >= 1
      })
      .map((obj) => {
        const id = Object.keys(obj)[0]
        const count = Object.values(obj)[1]

        return Array(Number(count) + 1)
          .join(`${id} `)
          .split(' ')
      })
      .reduce((acc, val) => acc.concat(val), [])
      .filter((el) => el)

    return arr
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
