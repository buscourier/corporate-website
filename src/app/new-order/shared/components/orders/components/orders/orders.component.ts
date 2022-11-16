import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core'
import {FormBuilder, Validators} from '@angular/forms'
import {Store} from '@ngrx/store'
import {Observable, switchMap, using, zip} from 'rxjs'
import {tap} from 'rxjs/operators'
import {endCitySelector} from '../../../end-point/store/selectors'
import {OrderStateInterface} from '../../../order/types/order-state.interface'
import {startCitySelector} from '../../../start-point/store/selectors'
import {changeActiveOrderAction} from '../../store/actions/change-active-order.action'
import {getAllCargosAction} from '../../store/actions/get-all-cargos.action'
import {getAllServicesAction} from '../../store/actions/get-all-services.action'
import {ordersValueChangesAction} from '../../store/actions/orders-value-changes.action'
import {
  activeOrderSelector,
  isAllCargosLoadedSelector,
  isAllCargosLoadingSelector,
  isAllServicesLoadedSelector,
  isAllServicesLoadingSelector,
  ordersSelector,
} from '../../store/selectors'

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrdersComponent implements OnInit {
  isAllCargosLoading$: Observable<boolean>
  isAllServicesLoading$: Observable<boolean>
  isAllCargosLoaded$: Observable<boolean>
  isAllServicesLoaded$: Observable<boolean>
  activeOrderIndex$: Observable<number>

  orders = this.fb.array([this.fb.control(null)])

  form = this.fb.group({
    orders: this.orders,
  })

  formValues$ = using(
    () =>
      this.form.valueChanges
        .pipe(
          tap((orders: any) => {
            this.store.dispatch(ordersValueChangesAction({orders}))
          })
        )
        .subscribe(),
    () => this.store.select(ordersSelector)
  )

  constructor(private fb: FormBuilder, private store: Store) {}

  ngOnInit(): void {
    this.initializeValues()
  }

  // ngAfterViewInit(): void {
  //   this.orders.push(
  //     this.fb.control<OrderStateInterface>(null, Validators.required)
  //   )
  // }

  initializeValues(): void {
    this.isAllCargosLoading$ = this.store.select(isAllCargosLoadingSelector)
    this.isAllServicesLoading$ = this.store.select(isAllServicesLoadingSelector)
    this.isAllCargosLoaded$ = this.store.select(isAllCargosLoadedSelector)
    this.isAllServicesLoaded$ = this.store.select(isAllServicesLoadedSelector)
    this.activeOrderIndex$ = this.store.select(activeOrderSelector)

    zip(
      this.store.select(startCitySelector),
      this.store.select(endCitySelector)
    )
      .pipe(
        switchMap(([startCity, endCity]) => {
          //TODO: maybe need to load like a sequence -> switchToMap ->switchToMap

          if (startCity && endCity) {
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
          }

          return [startCity, endCity]
        })
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

    this.selectOrder(index + 1)
  }
}
