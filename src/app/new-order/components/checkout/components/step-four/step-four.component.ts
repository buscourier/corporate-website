import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core'
import {FormBuilder} from '@angular/forms'
import {Observable} from 'rxjs'
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

  constructor(private fb: FormBuilder, private store: Store) {}

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

  onSubmit() {
    console.log('Step four', this.form.value)
  }
}
