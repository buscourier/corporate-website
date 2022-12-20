import {Component, HostListener, Inject, OnDestroy, OnInit} from '@angular/core'
import {Store} from '@ngrx/store'
import {delay, Observable, Subscription} from 'rxjs'
import {tap} from 'rxjs/operators'
import {LoginService} from './auth/components/login/services/login.service'
import {getCurrentUserAction} from './auth/store/actions/get-current-user.action'
import {isLoggedInSelector} from './auth/store/selectors'
import {changeScreenSizeAction} from './store/global/actions/change-screen-size.action'
import {isPageScrollBlockedSelector} from './store/global/selectors'
import {
  NavigationCancel,
  NavigationEnd,
  NavigationError,
  NavigationStart,
  Router,
  RouterEvent,
} from '@angular/router'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'Баскурьер'
  isLoggedIn$: Observable<boolean>
  isPageScrollSub: Subscription
  isLoading = true

  constructor(
    @Inject(LoginService) private readonly loginService: LoginService,
    private store: Store,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initializeValues()
    this.fetchData()
    this.changeScreenSize()
  }

  ngOnDestroy(): void {
    this.isPageScrollSub.unsubscribe()
  }

  initializeValues(): void {
    this.isLoggedIn$ = this.store.select(isLoggedInSelector)
    this.isPageScrollSub = this.store
      .select(isPageScrollBlockedSelector)
      .pipe(
        tap((isBlocked: boolean) => {
          if (isBlocked) {
            document.documentElement.classList.add('page-scroll-blocked')
          } else {
            document.documentElement.classList.remove('page-scroll-blocked')
          }
        })
      )
      .subscribe()

    this.router.events
      .pipe(
        tap((event: RouterEvent) => {
          if (event instanceof NavigationStart) {
            this.isLoading = true
          } else if (
            event instanceof NavigationEnd ||
            event instanceof NavigationCancel ||
            event instanceof NavigationError
          ) {
            this.isLoading = false
          }
        })
      )
      .subscribe()
  }

  fetchData(): void {
    this.store.dispatch(getCurrentUserAction())
  }

  onClick() {
    this.loginService.open(null).subscribe()
  }

  @HostListener('window:resize', ['$event'])
  changeScreenSize() {
    const xs = window.matchMedia(
      `(min-width: 360px) and (max-width: 639px)`
    ).matches
    const sm = window.matchMedia(
      `(min-width: 640px) and (max-width: 767px)`
    ).matches
    const md = window.matchMedia(
      `(min-width: 768px) and (max-width: 1023px)`
    ).matches
    const lg = window.matchMedia(
      `(min-width: 1024px) and (max-width: 1279px)`
    ).matches
    const xl = window.matchMedia(
      `(min-width: 1280px) and (max-width: 1535px)`
    ).matches
    const xxl = window.matchMedia(`(min-width: 1536px)`).matches

    if (xs) {
      this.store.dispatch(changeScreenSizeAction({screenSize: 'xs'}))
    } else if (sm) {
      this.store.dispatch(changeScreenSizeAction({screenSize: 'sm'}))
    } else if (md) {
      this.store.dispatch(changeScreenSizeAction({screenSize: 'md'}))
    } else if (lg) {
      this.store.dispatch(changeScreenSizeAction({screenSize: 'lg'}))
    } else if (xl) {
      this.store.dispatch(changeScreenSizeAction({screenSize: 'xl'}))
    } else if (xxl) {
      this.store.dispatch(changeScreenSizeAction({screenSize: 'xxl'}))
    }
  }
}
