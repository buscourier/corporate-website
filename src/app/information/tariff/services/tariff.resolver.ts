import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router'
import {select, Store} from '@ngrx/store'
import {Injectable} from '@angular/core'
import {filter, finalize, first, Observable} from 'rxjs'
import {isCitiesLoadedSelector} from '../store/selectors'
import {tap} from 'rxjs/operators'
import {getCitiesAction} from '../store/actions/get-cities.action'

@Injectable()
export class TariffResolver implements Resolve<any> {
  isLoading: boolean

  constructor(private store: Store) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {
    return this.store.pipe(
      select(isCitiesLoadedSelector),
      tap((isCitiesLoaded: boolean) => {
        if (!this.isLoading && !isCitiesLoaded) {
          this.store.dispatch(getCitiesAction())
        }
      }),
      filter((isCitiesLoaded: boolean) => isCitiesLoaded),
      first(),
      finalize(() => (this.isLoading = false))
    )
  }
}
