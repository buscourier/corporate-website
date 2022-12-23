import {ChangeDetectionStrategy, Component, Inject, OnInit} from '@angular/core'
import {Store} from '@ngrx/store'
import {TuiDialogContext} from '@taiga-ui/core'
import {POLYMORPHEUS_CONTEXT} from '@tinkoff/ng-polymorpheus'
import {Observable} from 'rxjs'
import {environment} from '../../../../../../environments/environment'
import {getOrderDetailsAction} from '../../store/actions/get-order-details.action'
import {
  backendErrorsSelector,
  isOrderDetailsLoadingSelector,
  orderDetailsSelector,
} from '../../store/selectors'
import {OrderDetailsInterface} from '../../types/order-details.interface'
import {cancelOrderAction} from './store/actions/cancel-order.action'
import {isSubmittingSelector} from './store/selectors'

@Component({
  selector: 'app-view-order',
  templateUrl: './view-order.component.html',
  styleUrls: ['./view-order.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ViewOrderComponent implements OnInit {
  isOrderLoading$: Observable<boolean>
  isSubmitting$: Observable<boolean>
  order$: Observable<OrderDetailsInterface>
  backendErrors$: Observable<string>

  constructor(
    private store: Store,
    @Inject(POLYMORPHEUS_CONTEXT)
    private readonly context: TuiDialogContext<any, any>
  ) {}

  ngOnInit(): void {
    this.initializeValues()
    this.fetchData()
  }

  get orderId(): number {
    return this.context.data.orderId
  }

  get userId(): number {
    return this.context.data.userId
  }

  initializeValues(): void {
    this.isOrderLoading$ = this.store.select(isOrderDetailsLoadingSelector)
    this.isSubmitting$ = this.store.select(isSubmittingSelector)
    this.order$ = this.store.select(orderDetailsSelector)
    this.backendErrors$ = this.store.select(backendErrorsSelector)
  }

  fetchData(): void {
    this.store.dispatch(
      getOrderDetailsAction({orderId: this.orderId.toString()})
    )
  }

  cancelOrder() {
    this.store.dispatch(
      cancelOrderAction({
        input: {
          'api-key': environment.apiKey,
          'user-id': this.userId.toString(),
          'order-id': this.orderId.toString(),
        },
      })
    )
    this.close()
  }

  formatDimensions(params: any) {
    return Object.entries(params)
      .filter((param) => {
        return param[0] !== 'count' && param[0] !== 'weight'
      })
      .map((param) => {
        return `<div class="flex flex-col">
           <small>${param[0]}</small>
           <b>${param[1]} см.</b>
        </div>`
      })
      .join(' x ')
  }

  close() {
    this.context.completeWith(1)
  }
}
