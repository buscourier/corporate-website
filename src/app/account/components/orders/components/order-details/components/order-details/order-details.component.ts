import {ChangeDetectionStrategy, Component, Inject, OnInit} from '@angular/core'
import {Store} from '@ngrx/store'
import {TuiDialogContext} from '@taiga-ui/core'
import {POLYMORPHEUS_CONTEXT} from '@tinkoff/ng-polymorpheus'
import {Observable} from 'rxjs'
import {cancelOrderAction} from '../../store/actions/cancel-order.action'
import {getOrderDetailsAction} from '../../store/actions/get-order-details.action'
import {
  backendErrorsSelector,
  detailsSelector,
  isLoadingSelector,
  isSubmittingSelector,
} from '../../store/selectors'

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrderDetailsComponent implements OnInit {
  isLoading$: Observable<boolean>
  isSubmitting$: Observable<boolean>
  orderCanceled$: Observable<boolean>
  backendErrors$: Observable<string>
  order$: Observable<any>

  constructor(
    @Inject(POLYMORPHEUS_CONTEXT)
    private readonly context: TuiDialogContext<number, number>,
    private store: Store
  ) {}

  get orderId(): number {
    return this.context.data
  }

  ngOnInit(): void {
    this.fetchData()
    this.initialazeValues()
  }

  fetchData() {
    this.store.dispatch(
      getOrderDetailsAction({orderId: this.orderId.toString()})
    )
  }

  initialazeValues() {
    this.isLoading$ = this.store.select(isLoadingSelector)
    this.isSubmitting$ = this.store.select(isSubmittingSelector)
    this.backendErrors$ = this.store.select(backendErrorsSelector)
    this.order$ = this.store.select(detailsSelector)
  }

  cancelOrder(order) {
    this.store.dispatch(cancelOrderAction({order}))
  }

  close() {
    this.context.completeWith(1)
  }
}
