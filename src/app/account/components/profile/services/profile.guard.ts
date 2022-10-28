import {Inject, Injectable} from '@angular/core'
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  Router,
  RouterStateSnapshot,
} from '@angular/router'
import {Store} from '@ngrx/store'
import {Observable} from 'rxjs'
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
      tap((isLoggedIn: boolean) => {
        if (!isLoggedIn) {
          this.loginService.open(null).subscribe()
          // return false
        }

        // return true
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
