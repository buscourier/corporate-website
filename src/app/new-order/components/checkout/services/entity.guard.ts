import {Injectable} from '@angular/core'
import {tap} from 'rxjs/operators'
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router'
import {Store} from '@ngrx/store'
import {isEntitySelector} from '../../../../auth/store/selectors'
import {Observable} from 'rxjs'

@Injectable()
export class EntityGuard implements CanActivate {
  constructor(private store: Store, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | Observable<boolean | UrlTree> {
    return this.store.select(isEntitySelector).pipe(
      tap((isValid: boolean) => {
        console.log('isValid', isValid)
        if (isValid) {
          this.router.navigateByUrl('/new-order/checkout/1')
        }
      })
    )
  }
}
