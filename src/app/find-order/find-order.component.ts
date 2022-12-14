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
}
