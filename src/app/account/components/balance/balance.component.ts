import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core'
import {filter, Observable, of, switchMap, take} from 'rxjs'
import {BackendErrorsInterface} from '../../../shared/types/backend-errors.interface'
import {BalanceInterface} from './types/balance.interface'
import {currentUserSelector} from '../../../auth/store/selectors'
import {CurrentUserInterface} from '../../../shared/types/current-user.interface'
import {getBalanceAction} from './store/actions/get-balance.action'
import {Store} from '@ngrx/store'
import {
  backendErrorsSelector,
  balanceSelector,
  isLoadingSelector,
} from './store/selectors'
import {tap} from 'rxjs/operators'

@Component({
  selector: 'app-balance',
  templateUrl: './balance.component.html',
  styleUrls: ['./balance.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BalanceComponent implements OnInit {
  isLoading$: Observable<boolean>
  balance$: Observable<BalanceInterface>
  backendErrors$: Observable<BackendErrorsInterface | null>

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.fetchData()
    this.initValues()
  }

  initValues(): void {
    this.isLoading$ = this.store.select(isLoadingSelector)
    this.backendErrors$ = this.store.select(backendErrorsSelector)
    this.balance$ = this.store.select(balanceSelector)
  }

  fetchData(): void {
    this.loadBalance()
  }

  loadBalance(): void {
    this.store
      .select(currentUserSelector)
      .pipe(
        filter(Boolean),
        switchMap((user: CurrentUserInterface) => {
          this.store.dispatch(getBalanceAction({userId: user.id}))
          return of(user)
        }),
        take(1)
      )
      .subscribe()
  }
}
