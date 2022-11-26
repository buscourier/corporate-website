import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core'
import {TUI_SVG_SRC_PROCESSOR} from '@taiga-ui/core'
import {filter, map, Observable, tap} from 'rxjs'
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
import {getEntityProfileAction} from './components/profile/entity/components/entity-view/store/actions/get-entity-profile.action'
import {getBalanceAction} from './store/actions/get-balance.action'

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
  balance$: Observable<any>

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

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.initializeValues()
    this.fetchData()
  }

  initializeValues() {
    this.isUserProfileLoading$ = this.store.select(isUserProfileLoadingSelector)
    this.isBalanceLoading$ = this.store.select(isBalanceLoadingSelector)
    this.isSubmitting$ = this.store.select(isSubmittingSelector)
    this.userProfile$ = this.store.select(userProfileSelector)
    this.balance$ = this.store.select(accountBalanceSelector).pipe(
      tap((balance) => {
        console.log('balance', balance)
      })
    )
  }

  fetchData(): void {
    this.store
      .select(currentUserSelector)
      .pipe(
        filter(Boolean),
        map((user: CurrentUserInterface) => {
          return this.store.dispatch(getBalanceAction({userId: user.id}))
        })
      )
      .subscribe()
  }
}
