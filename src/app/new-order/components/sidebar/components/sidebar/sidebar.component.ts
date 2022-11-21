import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
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
  combineAllSub: Subscription
  totalSum = 0

  constructor(
    private store: Store,
    private totalSumService: TotalSumService,
    private cdr: ChangeDetectorRef
  ) {}

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

          this.totalSumService
            .calculateTotalSum(
              startCityId,
              endCityId,
              startCourierId,
              endCourierId,
              orders
            )
            .subscribe((totalSum) => {
              this.totalSum = totalSum
              this.cdr.markForCheck()
            })
        })
      )
      .subscribe()
  }
}
