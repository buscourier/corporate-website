import {Injectable} from '@angular/core'
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  Router,
  RouterStateSnapshot,
} from '@angular/router'
import {Observable} from 'rxjs'
import {Store} from '@ngrx/store'
import {tap} from 'rxjs/operators'
import {isLoggedInSelector} from '../../auth/store/selectors'

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {
  isLoggedIn$: Observable<boolean>

  constructor(
    // private modalService: SimpleModalService,
    private store: Store,
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    this.isLoggedIn$ = this.store.select(isLoggedInSelector)

    return this.isLoggedIn$.pipe(
      tap((isLoggedIn: boolean) => {
        if (!isLoggedIn) {
          this.router.navigateByUrl('/')
          this.showLoginModal()
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
