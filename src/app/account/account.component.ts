import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core'
import {Router} from '@angular/router'
import {Store} from '@ngrx/store'
import {filter, map, Observable} from 'rxjs'
import {currentUserSelector} from '../auth/store/selectors'
import {CurrentUserInterface} from '../shared/types/current-user.interface'
import {getBalanceAction} from './store/actions/get-balance.action'
import {
  accountBalanceSelector,
  isBalanceLoadingSelector,
  isSubmittingSelector,
} from './store/selectors'
import {BalanceInterface} from './types/balance.interface'

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccountComponent implements OnInit {
  isUserProfileLoading$: Observable<boolean>
  isBalanceLoading$: Observable<boolean>
  isSubmitting$: Observable<boolean>
  userProfile$: Observable<any>
  balance$: Observable<{
    period: string
    debet: number
    orderSum: number
    serviceSum: number
    total: number
  }>

  sections = [
    {
      icon: 'icons::catalog',
      title: 'Мои заявки',
      text: '',
      route: '',
    },
    {
      icon: 'icons::catalog',
      title: 'Мои заявки',
      text:
        'Вы еще не создали ни одного отправления<br class="md:hidden" />\n' +
        '    Посмотрите историю ваших отправлений.',
      route: '',
    },
    {
      icon: 'icons::catalog',
      title: 'Мои заявки',
      text:
        'Вы еще не создали ни одного отправления<br class="md:hidden" />\n' +
        '    Посмотрите историю ваших отправлений.',
      route: '',
    },
  ]

  constructor(private store: Store, private router: Router) {}

  ngOnInit(): void {
    this.initializeValues()
    this.fetchData()
  }

  initializeValues() {
    this.isBalanceLoading$ = this.store.select(isBalanceLoadingSelector)
    this.isSubmitting$ = this.store.select(isSubmittingSelector)

    this.balance$ = this.store.select(accountBalanceSelector).pipe(
      filter(Boolean),
      map((balance: BalanceInterface) => {
        return {
          period: `${balance.first_period_date} - ${balance.last_period_date}`,
          debet: Number(balance.debet),
          orderSum: Number(balance.order_sum),
          serviceSum: Number(balance.service_sum),
          total:
            Number(balance.debet) -
            (Number(balance.order_sum) + Number(balance.service_sum)),
        }
      })
    )
  }

  fetchData(): void {
    this.loadBalance()
  }

  loadBalance(): void {
    this.store
      .select(currentUserSelector)
      .pipe(
        filter(Boolean),
        //TODO: map or switchMap or smth else?
        map((user: CurrentUserInterface) => {
          return this.store.dispatch(getBalanceAction({userId: user.id}))
        })
      )
      .subscribe() //TODO: unsubscribe?
  }
}
