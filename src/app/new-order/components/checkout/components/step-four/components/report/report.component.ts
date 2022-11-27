import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core'
import {Store} from '@ngrx/store'
import {Observable} from 'rxjs'
import {endPointSelector} from '../../../../../../shared/components/end-point/store/selectors'
import {EndPointStateInterface} from '../../../../../../shared/components/end-point/types/end-point-state.interface'
import {
  isOrdersValidSelector,
  ordersSelector,
} from '../../../../../../shared/components/orders/store/selectors'
import {startPointSelector} from '../../../../../../shared/components/start-point/store/selectors'
import {StartPointStateInterface} from '../../../../../../shared/components/start-point/types/start-point-state.interface'
import {personSelector} from '../../../step-one/components/person/store/selectors'
import {PersonStateInterface} from '../../../step-one/components/person/types/person-state.interface'
import {recipientSelector} from '../../../step-three/components/recipient/store/selectors'
import {RecipientStateInterface} from '../../../step-three/components/recipient/types/recipient-state.interface'
import {senderSelector} from '../../../step-two/components/sender/store/selectors'
import {SenderStateInterface} from '../../../step-two/components/sender/types/sender-state.interface'
import {entitySelector} from '../../../step-one/store/selectors'
import {ParcelInterface} from '../../../../../../shared/components/order/types/parcel.interface'

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReportComponent implements OnInit {
  startPoint$: Observable<StartPointStateInterface>
  endPoint$: Observable<EndPointStateInterface>
  person$: Observable<PersonStateInterface>
  entity$: Observable<any>
  sender$: Observable<SenderStateInterface>
  recipient$: Observable<RecipientStateInterface>
  orders$: Observable<any>
  isOrdersValid$: Observable<boolean>

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.initializeValues()
  }

  initializeValues() {
    this.startPoint$ = this.store.select(startPointSelector)
    this.endPoint$ = this.store.select(endPointSelector)
    this.person$ = this.store.select(personSelector)
    this.entity$ = this.store.select(entitySelector)
    this.sender$ = this.store.select(senderSelector)
    this.recipient$ = this.store.select(recipientSelector)
    this.orders$ = this.store.select(ordersSelector)
    this.isOrdersValid$ = this.store.select(isOrdersValidSelector)
  }

  getParcelDimension(parcel: ParcelInterface) {
    return `Ширина: <b>${parcel.width} см.</b>,
            Высота: <b>${parcel.height} см.</b>,
            Длина: <b>${parcel.length} см.</b>`
  }

  getPackages(packages): any {
    let arr: any[] = packages ? Object.values(packages) : []

    const formattedPackages = arr
      .reduce((acc, val) => acc.concat(val), [])
      .filter((obj) => {
        const isCheckboxActive = Object.entries(obj)[0][1]

        return isCheckboxActive && obj.count >= 1
      })
      .map((obj) => {
        return `${obj.data.short_name || ''} ${obj.data.site_name} (${
          obj.count
        } шт.)`
      })

    return formattedPackages.length ? formattedPackages.join(', ') : 'Нет'
  }

  getServices(services): any {
    const arr = services ? services.services : []

    const formattedServices = arr
      .filter((obj) => {
        const isCheckboxActive = Object.entries(obj)[0][1]
        const value = obj.sum || obj.phone

        return isCheckboxActive && value
      })
      .map((obj) => {
        return obj.data.name
      })

    return formattedServices.length ? formattedServices.join(', ') : 'Нет'
  }
}
