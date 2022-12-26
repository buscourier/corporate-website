import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Inject,
  OnInit,
  ViewChild,
} from '@angular/core'
import {Store} from '@ngrx/store'
import {TuiDialogContext} from '@taiga-ui/core'
import {POLYMORPHEUS_CONTEXT} from '@tinkoff/ng-polymorpheus'
import {filter, map, Observable} from 'rxjs'
import {getOrderDetailsAction} from '../../store/actions/get-order-details.action'
import {
  backendErrorsSelector,
  isOrderDetailsLoadingSelector,
  orderDetailsSelector,
} from '../../store/selectors'
import {OrderDetailsInterface} from '../../types/order-details.interface'
import {tap} from 'rxjs/operators'

@Component({
  selector: 'app-print-order',
  templateUrl: './print-order.component.html',
  styleUrls: ['./print-order.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PrintOrderComponent implements OnInit {
  isOrderLoading$: Observable<boolean>
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

  initializeValues(): void {
    this.isOrderLoading$ = this.store.select(isOrderDetailsLoadingSelector)
    this.order$ = this.store.select(orderDetailsSelector).pipe(
      filter(Boolean),
      map(({order}) => {
        return order
      })
    )
    this.backendErrors$ = this.store.select(backendErrorsSelector)
  }

  fetchData(): void {
    this.store.dispatch(
      getOrderDetailsAction({orderId: this.orderId.toString()})
    )
  }

  close() {
    this.context.completeWith(1)
  }

  print() {
    window.print()
  }

  formatDate(date) {
    return date.split(' ')[0]
  }
}
