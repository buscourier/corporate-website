import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnInit,
  Self,
} from '@angular/core'
import {FormArray, FormBuilder, Validators} from '@angular/forms'
import {Store} from '@ngrx/store'
import {TuiDestroyService} from '@taiga-ui/cdk'
import {
  combineLatest,
  concatMap,
  filter,
  map,
  Observable,
  take,
  takeUntil,
} from 'rxjs'
import {tap} from 'rxjs/operators'
import {endCitySelector} from '../end-point/store/selectors'
import {OrderStateInterface} from '../order/types/order-state.interface'
import {startCitySelector} from '../start-point/store/selectors'
import {changeActiveOrderAction} from './store/actions/change-active-order.action'
import {changeValidityAction} from './store/actions/change-validity.action'
import {getAllCargosAction} from './store/actions/get-all-cargos.action'
import {getAllServicesAction} from './store/actions/get-all-services.action'
import {ordersValueChangesAction} from './store/actions/orders-value-changes.action'
import {
  activeOrderSelector,
  isAllCargosLoadedSelector,
  isAllCargosLoadingSelector,
  isAllServicesLoadedSelector,
  isAllServicesLoadingSelector,
  isOrdersPristineSelector,
  ordersSelector,
} from './store/selectors'

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css'],
  providers: [TuiDestroyService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrdersComponent implements OnInit {
  isAllCargosLoading$: Observable<boolean>
  isAllServicesLoading$: Observable<boolean>
  isAllCargosLoaded$: Observable<boolean>
  isAllServicesLoaded$: Observable<boolean>
  orders$: Observable<any>
  activeOrderIndex$: Observable<number>

  orders = this.fb.array([])

  form = this.fb.group({
    orders: this.orders,
  })

  // formValues$ = using(
  //   () =>
  //     this.form.valueChanges
  //       .pipe(
  //         tap((orders: any) => {
  //           this.store.dispatch(ordersValueChangesAction({orders}))
  //         })
  //       )
  //       .subscribe(),
  //   () => this.store.select(ordersSelector)
  // )

  constructor(
    private fb: FormBuilder,
    private store: Store,
    @Self() @Inject(TuiDestroyService) private destroy$: TuiDestroyService
  ) {}

  ngOnInit(): void {
    this.initializeValues()

    this.form.valueChanges
      .pipe(
        tap((orders: any) => {
          this.store.dispatch(ordersValueChangesAction({orders}))
          this.store.dispatch(changeValidityAction({isValid: this.form.valid}))
        }),
        takeUntil(this.destroy$)
      )
      .subscribe()

    this.store
      .select(ordersSelector)
      .pipe(
        take(1),
        tap((orders: OrderStateInterface[]) => {
          if (!orders) {
            this.addOrder(0)
          }
        }),
        filter(Boolean),
        map((orders: OrderStateInterface[]) => {
          orders.forEach((order: OrderStateInterface) => {
            this.orders.push(this.fb.control(''))
          })

          return orders
        }),
        map((orders: OrderStateInterface[]) => {
          ;(this.form.get('orders') as FormArray).patchValue(orders, {
            emitEvent: false,
          })

          return orders
        }),
        takeUntil(this.destroy$)
      )
      .subscribe()
  }

  initializeValues(): void {
    this.isAllCargosLoading$ = this.store.select(isAllCargosLoadingSelector)
    this.isAllServicesLoading$ = this.store.select(isAllServicesLoadingSelector)
    this.isAllCargosLoaded$ = this.store.select(isAllCargosLoadedSelector)
    this.isAllServicesLoaded$ = this.store.select(isAllServicesLoadedSelector)
    this.activeOrderIndex$ = this.store.select(activeOrderSelector)

    combineLatest([
      this.store.select(startCitySelector).pipe(filter(Boolean)),
      this.store.select(endCitySelector).pipe(filter(Boolean)),
    ])
      .pipe(
        concatMap(([startCity, endCity]) => {
          //TODO: maybe need to load like a sequence -> switchToMap ->switchToMap

          this.store.dispatch(
            getAllCargosAction({
              startCityId: startCity.id,
              endCityId: endCity.id,
            })
          )

          this.store.dispatch(
            getAllServicesAction({
              startCityId: startCity.id,
            })
          )

          return [startCity, endCity]
        }),
        takeUntil(this.destroy$)
      )
      .subscribe()

    this.store
      .select(isOrdersPristineSelector)
      .pipe(
        tap((isPristine: boolean) => {
          if (isPristine) {
            this.form.reset()
          }
        }),
        takeUntil(this.destroy$)
      )
      .subscribe()
  }

  removeOrder() {
    alert(3)
  }

  selectOrder(index) {
    this.store.dispatch(changeActiveOrderAction({activeOrderIndex: index}))
  }

  addOrder(index) {
    this.orders.push(
      this.fb.control<OrderStateInterface>(null, Validators.required)
    )

    this.selectOrder(index)
  }
}
