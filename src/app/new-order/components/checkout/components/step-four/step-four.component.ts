import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core'
import {FormBuilder} from '@angular/forms'
import {Store} from '@ngrx/store'
import {ReCaptchaV3Service} from 'ng-recaptcha'
import {filter, Observable, Subscription, tap} from 'rxjs'
import {EndCityInterface} from '../../../../../shared/types/end-city.interface'
import {OfficeInterface} from '../../../../../shared/types/office.interface'
import {StartCityInterface} from '../../../../../shared/types/start-city.interface'
import {endPointSelector} from '../../../../shared/components/end-point/store/selectors'
import {EndPointStateInterface} from '../../../../shared/components/end-point/types/end-point-state.interface'
import {OrderStateInterface} from '../../../../shared/components/order/types/order-state.interface'
import {ParcelInterface} from '../../../../shared/components/order/types/parcel.interface'
import {
  isOrdersValidSelector,
  ordersSelector,
} from '../../../../shared/components/orders/store/selectors'
import {startPointSelector} from '../../../../shared/components/start-point/store/selectors'
import {StartPointStateInterface} from '../../../../shared/components/start-point/types/start-point-state.interface'
import {CourierInterface} from '../../../../shared/types/courier.interface'
import {TotalSumService} from '../../../sidebar/services/total-sum.service'
import {sendOrderAction} from '../../store/actions/send-order.action'
import {NewOrderInputInterface} from '../../types/new-order-input.interface'
import {personSelector} from '../step-one/components/person/store/selectors'
import {PersonStateInterface} from '../step-one/components/person/types/person-state.interface'
import {entitySelector} from '../step-one/store/selectors'
import {recipientSelector} from '../step-three/components/recipient/store/selectors'
import {RecipientStateInterface} from '../step-three/components/recipient/types/recipient-state.interface'
import {senderSelector} from '../step-two/components/sender/store/selectors'
import {SenderStateInterface} from '../step-two/components/sender/types/sender-state.interface'
import {isSubmittingSelector} from './store/selectors'

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
export class StepFourComponent implements OnInit, OnDestroy {
  startPoint$: Observable<StartPointStateInterface>
  endPoint$: Observable<EndPointStateInterface>
  person$: Observable<PersonStateInterface>
  entity$: Observable<any>
  sender$: Observable<SenderStateInterface>
  recipient$: Observable<RecipientStateInterface>
  orders$: Observable<any>
  isOrdersValid$: Observable<boolean>
  isSubmitting$: Observable<boolean>

  message = this.fb.control('')
  policy = this.fb.control(false)

  form = this.fb.group({
    message: this.message,
    policy: this.policy,
  })

  //TODO: need interface
  totalServices = []
  note = []

  orderData: NewOrderInputInterface = {
    'api-key': '8aab09f6-c5b3-43be-8895-153ea164984e',
    start_city: '',
    end_city: '',
    sending_date: '',
    sender_name: '',
    sender_phone: '',
    sender_passport: '',
    recipient_name: '',
    recipient_phone: '',
    orders: [],
    note: '',
  }

  token = ''
  tokenError?: {error: any}
  recaptchaSub: Subscription

  constructor(
    private fb: FormBuilder,
    private store: Store,
    private totalSumService: TotalSumService,
    private recaptchaService: ReCaptchaV3Service
  ) {}

  ngOnInit(): void {
    this.initializeValues()
  }

  ngOnDestroy(): void {
    if (this.recaptchaSub) {
      this.recaptchaSub.unsubscribe()
    }
  }

  initializeValues() {
    this.isSubmitting$ = this.store.select(isSubmittingSelector) //TODO: maybe use checkout store?
    this.startPoint$ = this.store.select(startPointSelector).pipe(
      filter(Boolean),
      tap((point: StartPointStateInterface) => {
        const courier: CourierInterface | null = point.pickup

        if (courier) {
          const value = `ул. ${courier.street},
             дом. ${courier.building}, офис./кв. ${courier.apartment}`

          this.totalServices.push({id: '1', value})
        }

        const city: StartCityInterface = point.city
        const office: OfficeInterface = point.give

        if (office) {
          this.note.push(`Место отправления: ${city.name}, ${office.address}`)
        }

        this.orderData.start_city = city.id
        //TODO: sending date
        // this.orderData.sending_date = point.date
        this.orderData.sending_date = '28.11.2022'
      })
    )

    this.endPoint$ = this.store.select(endPointSelector).pipe(
      filter(Boolean),
      tap((point: EndPointStateInterface) => {
        const courier: CourierInterface | null = point.delivery

        if (courier) {
          const value = `ул. ${courier.street},
             дом. ${courier.building}, офис./кв. ${courier.apartment}`

          this.totalServices.push({id: '2', value})
        }

        const city: EndCityInterface = point.city
        const office: OfficeInterface = point.get

        if (office) {
          this.note.push(`Место получения: ${city.name}, ${office.address}`)
        }

        this.orderData.end_city = city.id
      })
    )

    this.person$ = this.store.select(personSelector)
    this.entity$ = this.store.select(entitySelector)

    this.sender$ = this.store.select(senderSelector).pipe(
      filter(Boolean),
      tap((sender: SenderStateInterface) => {
        this.orderData.sender_name = sender.fio
        this.orderData.sender_passport = sender.docNumber
        this.orderData.sender_phone = sender.phone
      })
    )

    this.recipient$ = this.store.select(recipientSelector).pipe(
      filter(Boolean),
      tap((recipient: RecipientStateInterface) => {
        this.orderData.recipient_name = recipient.fio
        this.orderData.recipient_phone = recipient.phone
      })
    )

    this.orders$ = this.store.select(ordersSelector).pipe(
      filter(Boolean),
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

          this.orderData.orders.push({
            cargo_type,
            cargo_count,
            dimensions,
            services: this.totalServices,
          })
        })
      })
    )

    this.isOrdersValid$ = this.store.select(isOrdersValidSelector)

    this.policy.valueChanges
      .pipe(
        tap((value: boolean) => {
          if (value) {
            this.executeRecaptcha()
          }
        })
      )
      .subscribe()
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

  executeRecaptcha() {
    this.recaptchaSub = this.recaptchaService
      .execute('createNewOrder')
      .subscribe(
        (token: string) => {
          this.token = token
          this.tokenError = undefined
        },
        (error) => {
          this.token = ''
          this.tokenError = {error}
        }
      )
  }

  onSubmit() {
    const {message} = this.form.value
    // let note = this.note.unshift(message)
    // note.join(', ')
    //
    // this.orderData.note = this.note

    this.store.dispatch(sendOrderAction({order: this.orderData}))
  }
}
