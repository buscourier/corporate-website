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
import {isEntitySelector} from '../../auth/store/selectors'

@Injectable()
export class EntityGuard implements CanActivate {
  constructor(private store: Store, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | Observable<boolean | UrlTree> {
    return this.store.select(isEntitySelector).pipe(
      tap((isValid: boolean) => {
        if (isValid) {
          this.router.navigateByUrl('/account/profile/entity')
        } else {
          this.router.navigateByUrl('/account/profile/personal')
        }
      })
    )
  }
}
