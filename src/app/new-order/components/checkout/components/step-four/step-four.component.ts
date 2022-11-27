import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core'
import {FormBuilder} from '@angular/forms'
import {BehaviorSubject, map, Observable, tap} from 'rxjs'
import {StartPointStateInterface} from '../../../../shared/components/start-point/types/start-point-state.interface'
import {EndPointStateInterface} from '../../../../shared/components/end-point/types/end-point-state.interface'
import {PersonStateInterface} from '../step-one/components/person/types/person-state.interface'
import {SenderStateInterface} from '../step-two/components/sender/types/sender-state.interface'
import {RecipientStateInterface} from '../step-three/components/recipient/types/recipient-state.interface'
import {startPointSelector} from '../../../../shared/components/start-point/store/selectors'
import {endPointSelector} from '../../../../shared/components/end-point/store/selectors'
import {personSelector} from '../step-one/components/person/store/selectors'
import {entitySelector} from '../step-one/store/selectors'
import {senderSelector} from '../step-two/components/sender/store/selectors'
import {recipientSelector} from '../step-three/components/recipient/store/selectors'
import {
  isOrdersValidSelector,
  ordersSelector,
} from '../../../../shared/components/orders/store/selectors'
import {Store} from '@ngrx/store'
import {ParcelInterface} from '../../../../shared/components/order/types/parcel.interface'
import {CourierInterface} from '../../../../shared/types/courier.interface'
import {OrdersStateInterface} from '../../../../shared/components/orders/types/orders-state.interface'
import {OrderStateInterface} from '../../../../shared/components/order/types/order-state.interface'
import {TotalSumService} from '../../../sidebar/services/total-sum.service'
import {CargoInterface} from '../../../../shared/types/cargo.interface'

interface TotalServicesInterface {
  id: string
  value: string
}

@Component({
  selector: 'app-step-four',
  templateUrl: './step-four.component.html',
  styleUrls: ['./step-four.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StepFourComponent implements OnInit {
  startPoint$: Observable<StartPointStateInterface>
  endPoint$: Observable<EndPointStateInterface>
  person$: Observable<PersonStateInterface>
  entity$: Observable<any>
  sender$: Observable<SenderStateInterface>
  recipient$: Observable<RecipientStateInterface>
  orders$: Observable<any>
  isOrdersValid$: Observable<boolean>

  message = this.fb.control('')
  policy = this.fb.control(false)

  form = this.fb.group({
    message: this.message,
    policy: this.policy,
  })

  totalServices = []
  totalOrders = []

  constructor(
    private fb: FormBuilder,
    private store: Store,
    private totalSumService: TotalSumService
  ) {}

  ngOnInit(): void {
    this.initializeValues()
  }

  initializeValues() {
    this.startPoint$ = this.store.select(startPointSelector).pipe(
      tap((point: StartPointStateInterface) => {
        const courier: CourierInterface | null = point.pickup

        if (courier) {
          const value = `ул. ${courier.street},
             дом. ${courier.building}, офис./кв. ${courier.apartment}`

          this.totalServices.push({id: '1', value})
        }
      })
    )
    this.endPoint$ = this.store.select(endPointSelector).pipe(
      tap((point: EndPointStateInterface) => {
        const courier: CourierInterface | null = point.delivery

        if (courier) {
          const value = `ул. ${courier.street},
             дом. ${courier.building}, офис./кв. ${courier.apartment}`

          this.totalServices.push({id: '2', value})
        }
      })
    )
    this.person$ = this.store.select(personSelector)
    this.entity$ = this.store.select(entitySelector)
    this.sender$ = this.store.select(senderSelector)
    this.recipient$ = this.store.select(recipientSelector)
    this.orders$ = this.store.select(ordersSelector).pipe(
      tap((orders: OrderStateInterface[]) => {
        orders.forEach((order: OrderStateInterface) => {
          const packageIds = this.totalSumService.getPackageIds(order.packages)
          const packages = packageIds.map((id) => {
            return {id, value: ''}
          })

          const extServices = this.totalSumService.getExtServices(
            order.services
          )
          this.totalServices = [
            ...this.totalServices,
            ...packages,
            ...extServices,
          ]

          //TODO: need cargo interface
          const cargo = order.cargo
          let cargo_type = order.cargo.active.id
          let cargo_count = null
          //TODO: maybe change to null
          let dimensions = ''

          switch (cargo_type) {
            case '1':
              cargo_count = cargo.docs.places
              break
            case '2':
              cargo_count = this.totalSumService.getParcelPlaces(cargo.parcels)
              dimensions = cargo.parcels.length
              break
            case '5':
              //TODO: need interface
              cargo_type = cargo.auto.detail.id //TODO: auto.id or auto.detail.id
              cargo_count = cargo.auto.places
              break
            case '21':
              cargo_type = cargo.other.detail.id
              cargo_count = cargo.other.places
              break
          }

          this.totalOrders.push({
            cargo_type,
            cargo_count,
            dimensions,
            services: this.totalServices,
          })
        })
      })
    )
    this.isOrdersValid$ = this.store.select(isOrdersValidSelector)
  }

  getParcelDimension(parcel: ParcelInterface) {
    return `Ширина: <b>${parcel.width} см.</b>,
            Высота: <b>${parcel.height} см.</b>,
            Длина: <b>${parcel.length} см.</b>`
  }

  getPackages(packages): any {
    const arr: any[] = packages ? Object.values(packages) : []

    return arr
      .reduce((acc, val) => acc.concat(val), [])
      .filter((obj) => {
        const isCheckboxActive = Object.entries(obj)[0][1]

        return isCheckboxActive && obj.count >= 1
      })
  }

  getPackagesForReport(packages) {
    const formattedPackages = this.getPackages(packages).map((obj) => {
      return `${obj.data.short_name || ''} ${obj.data.site_name} (${
        obj.count
      } шт.)`
    })

    return formattedPackages.length ? formattedPackages.join(', ') : 'Нет'
  }

  getServices(services): any {
    const arr = services ? services.services : []

    return arr.filter((obj) => {
      const isCheckboxActive = Object.entries(obj)[0][1]
      const value = obj.sum || obj.phone

      return isCheckboxActive && value
    })
  }

  getServicesForReport(services) {
    const formattedServices = this.getServices(services).map((obj) => {
      return obj.data.name
    })
    return formattedServices.length ? formattedServices.join(', ') : 'Нет'
  }

  onSubmit() {
    console.log('Step four', this.totalOrders)
  }
}
