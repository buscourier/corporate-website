import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core'
import {Router} from '@angular/router'
import {Store} from '@ngrx/store'
import {combineLatest, debounceTime, Observable, Subscription} from 'rxjs'
import {tap} from 'rxjs/operators'
import {
  endCitySelector,
  endCourierSelector,
  endPointSelector,
} from '../../../../shared/components/end-point/store/selectors'
import {EndPointStateInterface} from '../../../../shared/components/end-point/types/end-point-state.interface'
import {
  isOrdersValidSelector,
  ordersSelector,
} from '../../../../shared/components/orders/store/selectors'
import {
  startCitySelector,
  startCourierSelector,
  startPointSelector,
} from '../../../../shared/components/start-point/store/selectors'
import {StartPointStateInterface} from '../../../../shared/components/start-point/types/start-point-state.interface'
import {TotalSumService} from '../../services/total-sum.service'

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarComponent implements OnInit, OnDestroy {
  isOrdersValid$: Observable<boolean>
  startPoint$: Observable<StartPointStateInterface>
  endPoint$: Observable<EndPointStateInterface>

  combineAllSub: Subscription
  totalSum = 0
  orders = null

  isTotalSumCalculated = false
  isCheckout = false

  constructor(
    private store: Store,
    private totalSumService: TotalSumService,
    private cdr: ChangeDetectorRef,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initializeValues()
  }

  ngOnDestroy(): void {
    this.combineAllSub.unsubscribe()
  }

  initializeValues() {
    this.isOrdersValid$ = this.store.select(isOrdersValidSelector)

    this.startPoint$ = this.store.select(startPointSelector)
    this.endPoint$ = this.store.select(endPointSelector)

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

          if (orders) {
            this.orders = orders
          }

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

              if (!this.isTotalSumCalculated && totalSum) {
                this.isTotalSumCalculated = true
              }

              this.cdr.markForCheck()
            })
        })
      )
      .subscribe()
  }

  //TODO: Нужно будет пройти по всем функциям в проекте и указать тип, который они возвращают
  getPackages(packages) {
    let arr: any[] = packages ? Object.values(packages) : []

    return arr
      .reduce((acc, val) => acc.concat(val), [])
      .filter((obj) => {
        const isCheckboxActive = Object.entries(obj)[0][1]

        return isCheckboxActive && obj.count >= 1
      })
  }

  getServices(services) {
    const arr = services ? services.services : []

    return arr.filter((obj) => {
      const isCheckboxActive = Object.entries(obj)[0][1]
      const value = obj.sum || obj.phone

      return isCheckboxActive && value
    })
  }

  goToCheckout() {
    this.isCheckout = true
    this.router.navigate(['new-order', 'checkout'])
  }
}
