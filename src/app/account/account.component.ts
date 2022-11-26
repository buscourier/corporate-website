import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core'
import {TUI_SVG_SRC_PROCESSOR} from '@taiga-ui/core'
import {filter, map, Observable, take, tap} from 'rxjs'
import {Store} from '@ngrx/store'
import {
  accountBalanceSelector,
  isBalanceLoadingSelector,
  isSubmittingSelector,
  isUserProfileLoadingSelector,
  userProfileSelector,
} from './store/selectors'
import {currentUserSelector} from '../auth/store/selectors'
import {CurrentUserInterface} from '../shared/types/current-user.interface'
import {getBalanceAction} from './store/actions/get-balance.action'
import {BalanceInterface} from './types/balance.interface'
import {getUserProfileAction} from './store/actions/get-user-profile.action'
import {UserProfileInterface} from './types/user-profile.interface'
import {Router} from '@angular/router'

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: TUI_SVG_SRC_PROCESSOR,
      useFactory: () => {
        return (src: string): string => {
          const myCustomPrefix = `icons::`

          return src.startsWith(myCustomPrefix)
            ? `assets/icons/${src.replace(myCustomPrefix, ``)}.svg`
            : src
        }
      },
    },
  ],
})
export class AccountComponent implements OnInit {
  isUserProfileLoading$: Observable<boolean>
  isBalanceLoading$: Observable<boolean>
  isSubmitting$: Observable<boolean>
  userProfile$: Observable<any>
  balance$: Observable<number>

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
    this.isUserProfileLoading$ = this.store.select(isUserProfileLoadingSelector)
    this.isBalanceLoading$ = this.store.select(isBalanceLoadingSelector)
    this.isSubmitting$ = this.store.select(isSubmittingSelector)

    this.store
      .select(userProfileSelector)
      .pipe(
        filter(Boolean),
        take(1),
        tap((profile: UserProfileInterface) => {
          console.log('profile', profile)
          this.router.navigate(['/new-order', 'checkout', '1'])
        })
      )
      .subscribe()

    this.balance$ = this.store.select(accountBalanceSelector).pipe(
      filter(Boolean),
      map((balance: BalanceInterface) => {
        return (
          Number(balance.debet) -
          (Number(balance.order_sum) + Number(balance.service_sum))
        )
      })
    )
  }

  fetchData(): void {
    this.store
      .select(currentUserSelector)
      .pipe(
        filter(Boolean),
        //TODO: map or switchMap or smth else?
        map((user: CurrentUserInterface) => {
          return this.store.dispatch(getBalanceAction({userId: user.id}))
        })
      )
      .subscribe()
  }

  proceedOrder() {
    this.store
      .select(currentUserSelector)
      .pipe(
        filter(Boolean),
        //TODO: map or switchMap or smth else?
        map((user: CurrentUserInterface) => {
          return this.store.dispatch(getUserProfileAction({userId: user.id}))
        })
      )
      .subscribe()
  }
}
