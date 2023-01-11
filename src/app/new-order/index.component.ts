import {ChangeDetectionStrategy, Component, OnDestroy} from '@angular/core'
import {Store} from '@ngrx/store'
import {calculateTotalSumAction} from './components/sidebar/store/actions/calculate-total-sum.action'
import {resetEndPointAction} from './shared/components/end-point/store/actions/reset-end-point.action'
import {resetOrdersAction} from './shared/components/orders/store/actions/reset-orders.action'
import {resetStartPointAction} from './shared/components/start-point/store/actions/reset-start-point.action'

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IndexComponent implements OnDestroy {
  constructor(private store: Store) {}

  ngOnDestroy(): void {
    this.clearFormsData()
  }

  clearFormsData() {
    this.store.dispatch(resetStartPointAction())
    this.store.dispatch(resetEndPointAction())
    this.store.dispatch(resetOrdersAction())
    this.store.dispatch(calculateTotalSumAction({isTotalSumCalculated: false}))
  }
}
