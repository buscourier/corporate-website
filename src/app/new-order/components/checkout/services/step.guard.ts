import {Injectable} from '@angular/core'
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router'
import {Store} from '@ngrx/store'
import {Observable, of} from 'rxjs'
import {tap} from 'rxjs/operators'

@Injectable()
export class StepGuard implements CanActivate {
  constructor(private store: Store, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | Observable<boolean | UrlTree> {
    return of(true).pipe(
      tap((ok) => {
        if (!ok) {
          this.router.navigateByUrl('/new-order/checkout')
        }
      })
    )
  }
}
