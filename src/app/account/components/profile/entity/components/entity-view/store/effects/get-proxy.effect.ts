import {Injectable} from '@angular/core'
import {Actions, createEffect, ofType} from '@ngrx/effects'
import {catchError, map, of, switchMap} from 'rxjs'
import {ProxyPersonService} from 'src/app/shared/services/proxy-person.service'
import {ProxyPersonInterface} from 'src/app/shared/types/proxy-person.interface'
import {
  getProxyAction,
  getProxyFailureAction,
  getProxySuccessAction,
} from '../actions/get-proxy.action'

@Injectable()
export class GetProxyEffect {
  constructor(
    private actions$: Actions,
    private proxyPersonService: ProxyPersonService
  ) {}

  getProxy$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getProxyAction),
      switchMap(({userId}) => {
        return this.proxyPersonService.getProxy(userId).pipe(
          map((proxy: ProxyPersonInterface[]) =>
            getProxySuccessAction({proxy})
          ),
          catchError(() => of(getProxyFailureAction()))
        )
      })
    )
  )
}
