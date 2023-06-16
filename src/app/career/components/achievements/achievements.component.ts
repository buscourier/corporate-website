import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core'
import {Observable} from 'rxjs'
import {BackendErrorsInterface} from '../../../shared/types/backend-errors.interface'
import {AchievementsInterface} from './types/achievements.interface'
import {Store} from '@ngrx/store'
import {
  achievementsSelector,
  backendErrorsSelector,
  isLoadingSelector,
} from './store/selectors'
import {getAchievementsAction} from './store/actions/get-achievements.action'
import {tap} from 'rxjs/operators'

@Component({
  selector: 'app-achievements',
  templateUrl: './achievements.component.html',
  styleUrls: ['./achievements.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AchievementsComponent implements OnInit {
  isLoading$: Observable<boolean>
  backendErrors$: Observable<BackendErrorsInterface | null>
  achievements$: Observable<AchievementsInterface | null>

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.initValues()
    this.fetchData()
  }

  initValues(): void {
    this.isLoading$ = this.store.select(isLoadingSelector)
    this.backendErrors$ = this.store.select(backendErrorsSelector)
    this.achievements$ = this.store.select(achievementsSelector)
  }

  fetchData(): void {
    this.store.dispatch(getAchievementsAction())
  }

  getWorkPeriod() {
    const date = new Date()

    return date.getFullYear() - 2013
  }
}
