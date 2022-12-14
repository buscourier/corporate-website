import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core'
import {FormBuilder} from '@angular/forms'
import {Store} from '@ngrx/store'
import {Observable} from 'rxjs'
import {getStatusesAction} from './store/actions/get-statuses.action'
import {isStatusesLoadingSelector, statusesSelector} from './store/selectors'
import {OrderStatusInterface} from './types/order-status.interface'

@Component({
  selector: 'app-find-order',
  templateUrl: './find-order.component.html',
  styleUrls: ['./find-order.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FindOrderComponent implements OnInit {
  isStatusesLoading$: Observable<boolean>
  statuses$: Observable<OrderStatusInterface[]>
  backendErrors$: Observable<string>

  orderNumber = this.fb.control('')

  form = this.fb.group({
    orderNumber: this.orderNumber,
  })

  public Status = {
    ORDER_POSTING: 'yellow',
    ORDER_INTRANSIT: 'yellow',
    ORDER_SORTING: 'yellow',
    ORDER_READY: 'blue',
    ORDER_DELIVERED: 'blue',
    ORDER_SELFEXTRACT: 'yellow',
    ORDER_RETURN: 'yellow',
    ORDER_FAILURE: 'red',
    ORDER_STORAGE: 'blue',
    ORDER_RESENT: 'yellow',
    ORDER_CANCELED: 'red',
  }

  constructor(private fb: FormBuilder, private store: Store) {}

  ngOnInit(): void {
    this.isStatusesLoading$ = this.store.select(isStatusesLoadingSelector)
    this.statuses$ = this.store.select(statusesSelector)
  }

  onSubmit() {
    if (this.form.invalid) {
      return
    }

    const {orderNumber} = this.form.value
    this.store.dispatch(getStatusesAction({orderNumber}))
  }

  formatDate(date) {
    const datetime = date.split(' ')
    const formattedDate = new Intl.DateTimeFormat('ru-Ru', {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
    }).format(new Date(datetime[0]))

    return formattedDate
  }
}
