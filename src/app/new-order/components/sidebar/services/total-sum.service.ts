import {HttpClient} from '@angular/common/http'
import {Injectable} from '@angular/core'
import {map, Observable, of, zip} from 'rxjs'
import {OrderStateInterface} from 'src/app/new-order/shared/components/order/types/order-state.interface'
import {environment} from '../../../../../environments/environment'
import {ParcelInterface} from '../../../shared/components/order/types/parcel.interface'

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
            return sum + Number(price)
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
      return new Observable<TotalSumInterface>()
      // return
    }

    let cargoId = order.cargo.type.id
    let result = null

    //TODO: refactor after validation well be ok
    switch (order.cargo.type.id) {
      case '1':
        cargoId = order.cargo.value
          ? `${order.cargo.type.id}, ${order.cargo.value}`
          : null
        break
      case '2':
        cargoId = order.cargo.type.id
        break
      case '5':
      case '21':
        cargoId =
          order.cargo.value && order.cargo.value.detail
            ? `${order.cargo.value.detail.id}, ${order.cargo.value?.places}`
            : null
        break
    }

    console.log('cargo', cargoId)

    const allServiceIds = [
      startCourierId,
      endCourierId,
      ...this.getAllServiceIds(order),
    ].filter(Boolean)

    if (order.cargo.type.id === '2') {
      const parcels = order.cargo.value ? order.cargo.value.parcels : []

      console.log('order.cargo.value', order.cargo.value)
      console.log('parcels', parcels)

      if (parcels.length) {
        result = this.getParcelsSum(
          startCityId,
          endCityId,
          cargoId,
          allServiceIds,
          parcels
        )
      }
    } else {
      result = this.getResult(
        startCityId,
        endCityId,
        cargoId,
        allServiceIds,
        0,
        0
      )
    }

    return result
  }

  getParcelsSum(
    startCityId: string,
    endCityId: string,
    cargoId: string,
    allServiceIds: string[],
    parcels
  ) {
    const weight = this.getWeight(parcels)
    const dim = this.getDim(parcels)
    const places = this.getParcelPlaces(parcels)

    const sumWithoutServices = this.getResult(
      startCityId,
      endCityId,
      cargoId,
      null,
      weight,
      dim
    ).pipe(
      map(({price}) => {
        return {price: price * places}
      })
    )

    const sumWithoutParcels = this.getResult(
      startCityId,
      endCityId,
      '0',
      allServiceIds,
      0,
      0
    )

    return zip(sumWithoutServices, sumWithoutParcels).pipe(
      map((arr) => {
        const sum = arr.reduce((acc, {price}) => {
          return acc + price
        }, 0)

        return {price: sum}
      }, 0)
    )
  }

  getDim(parcels: ParcelInterface[]) {
    const objSum = parcels.filter(Boolean).reduce(
      (acc, obj: ParcelInterface) => ({
        length: acc.length + obj.length,
        width: acc.width + obj.width,
        height: acc.height + obj.height,
      }),
      {width: 0, height: 0, length: 0}
    )

    return Object.values(objSum).reduce(
      (sum: number, val: number) => sum + val,
      0
    )
  }

  getWeight(parcels: ParcelInterface[]) {
    return parcels
      .filter(Boolean)
      .reduce((sum: number, {weight}) => sum + weight, 0)
  }

  getParcelPlaces(parcels: ParcelInterface[]) {
    return parcels
      .filter(Boolean)
      .reduce((sum: number, parcel: ParcelInterface) => sum + parcel.count, 0)
  }

  getAllServiceIds({packages, services}: OrderStateInterface) {
    const packageIds = this.getPackageIds(packages)
    const extServiceIds = this.getExtServiceIds(services)

    return [...packageIds, ...extServiceIds]
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

  getExtServiceIds(services) {
    const INSURANCE_15 = '58'
    const INSURANCE_30 = '59'
    const LIMIT_MIN = 15000

    return services.services
      .map((obj) => {
        const id = Object.entries(obj)[0][0]
        const checked = Object.entries(obj)[0][1]
        const value = obj.sum || obj.phone

        const formattedId =
          id === 'insurance' && obj.sum
            ? obj.sum >= LIMIT_MIN
              ? INSURANCE_30
              : INSURANCE_15
            : id

        return checked && value ? {id: formattedId, value} : null
      })
      .filter((service) => service)
      .map((service) => service.id)
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
