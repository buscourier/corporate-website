import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router'
import {Injectable} from '@angular/core'
import {select, Store} from '@ngrx/store'
import {filter, finalize, first, Observable} from 'rxjs'
import {isMarkupLoadedSelector} from './store/selectors'
import {tap} from 'rxjs/operators'
import {getMarkupAction} from './store/actions/get-markup.action'

@Injectable()
export class PolicyResolver implements Resolve<any> {
  private isLoading = false

  constructor(private store: Store) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {
    return this.store.pipe(
      select(isMarkupLoadedSelector),
      tap((isMarkupLoaded: boolean) => {
        if (!this.isLoading && !isMarkupLoaded) {
          this.isLoading = true
          this.store.dispatch(getMarkupAction())
        }
      }),
      filter((isMarkupLoaded: boolean) => isMarkupLoaded),
      first(),
      finalize(() => (this.isLoading = false))
    )
  }
}
