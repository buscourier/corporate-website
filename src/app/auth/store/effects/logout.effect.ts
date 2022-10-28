import {Injectable} from '@angular/core'
import {Router} from '@angular/router'
import {Actions, createEffect, ofType} from '@ngrx/effects'
import {tap} from 'rxjs'
import {PersistenceService} from '../../../shared/services/persistence.service'
import {logoutAction} from '../actions/sync.action'

@Injectable()
export class LogoutEffect {
  constructor(
    private actions$: Actions,
    private persistenceService: PersistenceService,
    private router: Router
  ) {}

  logout$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(logoutAction),
        tap(() => {
          this.persistenceService.set('accessToken', '')
          this.router.navigateByUrl('/')
        })
      )
    },
    {dispatch: false}
  )
}
