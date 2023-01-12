import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core'
import {map, Observable} from 'rxjs'
import {Store} from '@ngrx/store'
import {newOrderResponseSelector} from '../checkout/store/selectors'
import {NewOrderResponseInterface} from '../checkout/types/new-order-response.interface'
import {Router} from '@angular/router'

@Component({
  selector: 'app-success',
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SuccessComponent implements OnInit {
  orderId$: Observable<number>

  constructor(private store: Store, private router: Router) {}

  ngOnInit(): void {
    this.orderId$ = this.store.select(newOrderResponseSelector).pipe(
      map((order: NewOrderResponseInterface) => {
        return order.order_id
      })
    )
  }

  findOrder(orderId) {
    this.router.navigate(['/find-order'], {queryParams: {orderId}})
  }
}
