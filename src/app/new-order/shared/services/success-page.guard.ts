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
import {createOrderSuccessSelector} from '../../components/checkout/store/selectors'

@Injectable()
export class SuccessPageGuard implements CanActivate {
  constructor(private store: Store, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | Observable<boolean | UrlTree> {
    return this.store.select(createOrderSuccessSelector).pipe(
      tap((created: boolean) => {
        if (!created) {
          this.router.navigateByUrl('/new-order')
        }
      })
    )
  }
}
