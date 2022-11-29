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
import {isPersonalSelector} from '../../auth/store/selectors'

@Injectable()
export class PersonalGuard implements CanActivate {
  constructor(private store: Store, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | Observable<boolean | UrlTree> {
    return this.store.select(isPersonalSelector).pipe(
      tap((isValid: boolean) => {
        if (isValid) {
          this.router.navigateByUrl('/account/profile/personal')
        } else {
          this.router.navigateByUrl('/')
        }
      })
    )
  }
}
