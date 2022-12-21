import {Inject, Injectable} from '@angular/core'
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  Router,
  RouterStateSnapshot,
} from '@angular/router'
import {Store} from '@ngrx/store'
import {Observable, take} from 'rxjs'
import {tap} from 'rxjs/operators'
import {isLoggedInSelector} from '../../auth/store/selectors'
import {LoginService} from '../components/login/services/login.service'

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {
  isLoggedIn$: Observable<boolean>

  constructor(
    private store: Store,
    private router: Router,
    @Inject(LoginService) private readonly loginService: LoginService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | boolean {
    this.isLoggedIn$ = this.store.select(isLoggedInSelector)

    return this.isLoggedIn$.pipe(
      // filter(Boolean),
      tap((isLoggedIn: boolean) => {
        if (!isLoggedIn) {
          this.loginService.open(null).pipe(take(1)).subscribe()
        }
      })
    )
  }

  canActivateChild(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    return this.canActivate(route, state)
  }

  showLoginModal() {}
}
