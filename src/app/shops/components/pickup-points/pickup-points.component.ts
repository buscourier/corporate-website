import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core'
import {Observable} from 'rxjs'
import {OfficeInterface} from '../../../shared/types/office.interface'
import {Store} from '@ngrx/store'
import {
  backendErrorsSelector,
  isPointsLoadingSelector,
  pointsSelector,
} from './store/selectors'
import {getPointsAction} from './store/actions/get-points.action'

@Component({
  selector: 'app-pickup-points',
  templateUrl: './pickup-points.component.html',
  styleUrls: ['./pickup-points.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PickupPointsComponent implements OnInit {
  isPointsLoading$: Observable<boolean>
  points$: Observable<OfficeInterface[]>
  backendErrors$: Observable<string>

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.initializeValues()
    this.fetchData()
  }

  initializeValues(): void {
    this.isPointsLoading$ = this.store.select(isPointsLoadingSelector)
    this.points$ = this.store.select(pointsSelector)
    this.backendErrors$ = this.store.select(backendErrorsSelector)
  }

  fetchData(): void {
    this.store.dispatch(getPointsAction())
  }
}
