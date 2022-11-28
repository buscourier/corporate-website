import {Injectable} from '@angular/core'
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router'
import {Store} from '@ngrx/store'
import {Observable} from 'rxjs'
import {tap} from 'rxjs/operators'
import {isCheckoutValidSelector} from '../store/selectors'

@Injectable()
export class StepGuard implements CanActivate {
  constructor(private store: Store, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | Observable<boolean | UrlTree> {
    return this.store.select(isCheckoutValidSelector).pipe(
      tap((isValid: boolean) => {
        if (!isValid) {
          this.router.navigateByUrl('/new-order/checkout')
        }
      })
    )
  }
}
