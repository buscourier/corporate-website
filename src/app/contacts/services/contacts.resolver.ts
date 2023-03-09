import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router'
import {Injectable} from '@angular/core'
import {select, Store} from '@ngrx/store'
import {isOfficesLoadedSelector} from '../store/selectors'
import {tap} from 'rxjs/operators'
import {getOfficesAction} from '../store/actions/get-offices.action'
import {filter, finalize, first} from 'rxjs'

@Injectable()
export class ContactsResolver implements Resolve<any> {
  isLoading: boolean

  constructor(private store: Store) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): any {
    return this.store.pipe(
      select(isOfficesLoadedSelector),
      tap((isOfficesLoaded: boolean) => {
        if (!this.isLoading && !isOfficesLoaded) {
          this.store.dispatch(getOfficesAction())
        }
      }),
      filter((isOfficesLoaded: boolean) => isOfficesLoaded),
      first(),
      finalize(() => (this.isLoading = false))
    )
  }
}
