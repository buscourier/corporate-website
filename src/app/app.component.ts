import {Component, HostListener, Inject, OnInit, Self} from '@angular/core'
import {
  NavigationCancel,
  NavigationEnd,
  NavigationError,
  NavigationStart,
  Router,
  RouterEvent,
} from '@angular/router'
import {Store} from '@ngrx/store'
import {TuiDestroyService} from '@taiga-ui/cdk'
import {tuiLoaderOptionsProvider} from '@taiga-ui/core'
import {Observable, take, takeUntil} from 'rxjs'
import {tap} from 'rxjs/operators'
import {LoginService} from './auth/components/login/services/login.service'
import {getCurrentUserAction} from './auth/store/actions/get-current-user.action'
import {isLoggedInSelector} from './auth/store/selectors'
import {changeScreenSizeAction} from './store/global/actions/change-screen-size.action'
import {isPageScrollBlockedSelector} from './store/global/selectors'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [
    TuiDestroyService,
    tuiLoaderOptionsProvider({
      size: 'l',
    }),
  ],
})
export class AppComponent implements OnInit {
  title = 'Баскурьер'
  isLoggedIn$: Observable<boolean>
  isLoading = true
  url = ''

  constructor(
    @Inject(LoginService) private readonly loginService: LoginService,
    private store: Store,
    private router: Router,
    @Self()
    @Inject(TuiDestroyService)
    private destroy$: TuiDestroyService
  ) {}

  ngOnInit(): void {
    this.initializeValues()
    this.fetchData()
    this.changeScreenSize()
  }

  initializeValues(): void {
    this.isLoggedIn$ = this.store.select(isLoggedInSelector)
    this.store
      .select(isPageScrollBlockedSelector)
      .pipe(
        tap((isBlocked: boolean) => {
          if (isBlocked) {
            document.documentElement.classList.add('page-scroll-blocked')
          } else {
            document.documentElement.classList.remove('page-scroll-blocked')
          }
        }),
        takeUntil(this.destroy$)
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
            this.url = event.url.split('/')[1]
          }
        }),
        takeUntil(this.destroy$)
      )
      .subscribe()
  }

  fetchData(): void {
    this.store.dispatch(getCurrentUserAction())
  }

  onClick() {
    this.loginService.open(null).pipe(take(1)).subscribe()
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
