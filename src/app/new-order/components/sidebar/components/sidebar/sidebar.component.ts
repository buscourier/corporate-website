import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Inject,
  OnDestroy,
  OnInit,
} from '@angular/core'
import {DomSanitizer} from '@angular/platform-browser'
import {NavigationEnd, Router, RouterEvent} from '@angular/router'
import {Store} from '@ngrx/store'
import {TUI_IS_MOBILE} from '@taiga-ui/cdk'
import {TuiPdfViewerOptions, TuiPdfViewerService} from '@taiga-ui/kit'
import {PolymorpheusContent} from '@tinkoff/ng-polymorpheus'
import {
  combineLatest,
  debounceTime,
  filter,
  Observable,
  Subscription,
} from 'rxjs'
import {tap} from 'rxjs/operators'
import {isPhoneScreenSelector} from '../../../../../store/global/selectors'
import {resetEndPointAction} from '../../../../shared/components/end-point/store/actions/reset-end-point.action'
import {
  endCitySelector,
  endCourierSelector,
  endPointSelector,
} from '../../../../shared/components/end-point/store/selectors'
import {EndPointStateInterface} from '../../../../shared/components/end-point/types/end-point-state.interface'
import {resetOrdersAction} from '../../../../shared/components/orders/store/actions/reset-orders.action'
import {
  isOrdersValidSelector,
  ordersSelector,
} from '../../../../shared/components/orders/store/selectors'
import {resetStartPointAction} from '../../../../shared/components/start-point/store/actions/reset-start-point.action'
import {
  startCitySelector,
  startCourierSelector,
  startPointSelector,
} from '../../../../shared/components/start-point/store/selectors'
import {StartPointStateInterface} from '../../../../shared/components/start-point/types/start-point-state.interface'
import {TotalSumService} from '../../services/total-sum.service'
import {calculateTotalSumAction} from '../../store/actions/calculate-total-sum.action'
import {isTotalSumCalculatedSelector} from '../../store/selectors'

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
  isPhoneScreen$: Observable<boolean>
  totalSumCalculatedSub: Subscription

  combineAllSub: Subscription
  totalSum = 0
  orders = null
  isSidebarOpened = true

  private readonly pdf = `assets/media/bus_schedule.pdf`

  isTotalSumCalculated = false
  isCheckoutPage = false

  constructor(
    private store: Store,
    private totalSumService: TotalSumService,
    private cdr: ChangeDetectorRef,
    private router: Router,
    @Inject(DomSanitizer) private readonly sanitizer: DomSanitizer,
    @Inject(TuiPdfViewerService)
    private readonly pdfService: TuiPdfViewerService,
    @Inject(TUI_IS_MOBILE) private readonly isMobile: boolean
  ) {}

  ngOnInit(): void {
    this.initializeValues()
  }

  ngOnDestroy(): void {
    this.combineAllSub.unsubscribe()
    this.totalSumCalculatedSub.unsubscribe()
  }

  initializeValues() {
    this.isOrdersValid$ = this.store.select(isOrdersValidSelector)
    this.startPoint$ = this.store.select(startPointSelector)
    this.endPoint$ = this.store.select(endPointSelector)
    this.isPhoneScreen$ = this.store.select(isPhoneScreenSelector)

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
            .pipe(
              tap((totalSum) => {
                this.totalSum = totalSum

                if (!this.isTotalSumCalculated && totalSum) {
                  this.store.dispatch(
                    calculateTotalSumAction({isTotalSumCalculated: true})
                  )
                }
              })
            )
            .subscribe(() => {
              this.cdr.markForCheck()
            })
        })
      )
      .subscribe()

    this.totalSumCalculatedSub = this.store
      .select(isTotalSumCalculatedSelector)
      .pipe(
        tap((isCalculated: boolean) => {
          this.isTotalSumCalculated = isCalculated
        })
      )
      .subscribe()

    this.isCheckoutPage = this.isCheckout(this.router.url)

    //TODO: need unsubscribe?
    this.router.events
      .pipe(filter((event: RouterEvent) => event instanceof NavigationEnd))
      .subscribe((event: RouterEvent) => {
        this.isCheckoutPage = this.isCheckout(event.url)
      })
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

  isCheckout(url) {
    return url.split('/').indexOf('checkout') !== -1
  }

  goToCheckout() {
    this.router.navigate(['new-order', 'checkout'])
  }

  reset() {
    this.store.dispatch(resetStartPointAction())
    this.store.dispatch(resetEndPointAction())
    this.store.dispatch(resetOrdersAction())
    this.store.dispatch(calculateTotalSumAction({isTotalSumCalculated: false}))
  }

  showPdf(actions: PolymorpheusContent<TuiPdfViewerOptions>): void {
    this.pdfService
      .open(
        this.sanitizer.bypassSecurityTrustResourceUrl(
          this.isMobile
            ? `https://busbox.guru/uploads/pages/Расписание_отправлений_Владивосток.pdf`
            : this.pdf
        ),
        {
          label: `Расписание автобусов`,
          actions,
        }
      )
      .subscribe()
  }

  toggleSidebar() {
    this.isSidebarOpened = !this.isSidebarOpened
  }
}
