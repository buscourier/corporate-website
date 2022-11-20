import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core'
import {Store} from '@ngrx/store'
import {combineLatest, debounceTime, Observable, Subscription} from 'rxjs'
import {tap} from 'rxjs/operators'
import {EndCityInterface} from '../../../../../shared/types/end-city.interface'
import {StartCityInterface} from '../../../../../shared/types/start-city.interface'
import {
  endCitySelector,
  endCourierSelector,
} from '../../../../shared/components/end-point/store/selectors'
import {OrderStateInterface} from '../../../../shared/components/order/types/order-state.interface'
import {ordersSelector} from '../../../../shared/components/orders/store/selectors'
import {
  startCitySelector,
  startCourierSelector,
} from '../../../../shared/components/start-point/store/selectors'
import {CourierInterface} from '../../../../shared/types/courier.interface'
import {TotalSumService} from '../../services/total-sum.service'

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarComponent implements OnInit, OnDestroy {
  startCity$: Observable<StartCityInterface>
  endCity$: Observable<EndCityInterface>
  startCourier$: Observable<CourierInterface>
  endCourier$: Observable<CourierInterface>
  orders$: Observable<OrderStateInterface[]>
  combineAllSub: Subscription

  constructor(private store: Store, private totalSumService: TotalSumService) {}

  ngOnInit(): void {
    this.initializeValues()
  }

  ngOnDestroy(): void {
    this.combineAllSub.unsubscribe()
  }

  initializeValues() {
    this.combineAllSub = combineLatest([
      this.store.select(startCitySelector),
      this.store.select(endCitySelector),
      this.store.select(startCourierSelector),
      this.store.select(endCourierSelector),
      this.store.select(ordersSelector),
    ])
      .pipe(
        debounceTime(500),
        tap(([startCity, endCity, startCourier, endCourier, orders]) => {
          const startCityId = startCity ? startCity.id : null
          const endCityId = endCity ? endCity.id : null
          const startCourierId = startCourier ? '1' : null
          const endCourierId = endCourier ? '2' : null

          this.totalSumService.calculateTotalSum(
            startCityId,
            endCityId,
            startCourierId,
            endCourierId,
            orders
          )

          // console.log('startCity', startCity)
          // console.log('endCity', endCity)
          // console.log('startCourier', startCourier)
          // console.log('endCourier', endCourier)
          // console.log('orders', orders)
        })
      )
      .subscribe()
  }
}
