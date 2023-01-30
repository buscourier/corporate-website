import {HttpErrorResponse} from '@angular/common/http'
import {Injectable} from '@angular/core'
import {Router} from '@angular/router'
import {Actions, createEffect, ofType} from '@ngrx/effects'
import {catchError, map, of, switchMap} from 'rxjs'
import {PersistenceService} from '../../../shared/services/persistence.service'
import {CurrentUserInterface} from '../../../shared/types/current-user.interface'
import {AuthService} from '../../services/auth.service'
import {
  loginAction,
  loginFailureAction,
  loginSuccessAction,
} from '../actions/login.action'
import {BackendErrorsInterface} from '../../../shared/types/backend-errors.interface'

@Injectable()
export class LoginEffect {
  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private persistenceService: PersistenceService,
    private router: Router
  ) {}

  login$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loginAction),
      switchMap(({request}) =>
        this.authService.login(request).pipe(
          map((currentUser: CurrentUserInterface) => {
            this.persistenceService.set('accessToken', currentUser.auth_key)
            return loginSuccessAction({currentUser})
          }),
          catchError((backendErrors: BackendErrorsInterface) => {
            return of(loginFailureAction({backendErrors}))
            // of(loginFailureAction())
          })
        )
      )
    )
  })

  // redirectAfterSubmit$ = createEffect(() =>
  //   this.actions$
  //     .pipe(
  //       ofType(loginSuccessAction),
  //       tap(() => this.router.navigateByUrl('/'))
  //     ),
  //   {dispatch: false}
  // )
}
