import {Injectable} from '@angular/core'
import {Actions, createEffect, ofType} from '@ngrx/effects'
import {Router} from '@angular/router'
import {
  loginAction,
  loginFailureAction,
  loginSuccessAction,
} from '../actions/login.action'
import {catchError, map, of, switchMap, tap} from 'rxjs'
import {AuthService} from '../../services/auth.service'
import {CurrentUserInterface} from '../../../shared/types/current-user.interface'
import {HttpErrorResponse} from '@angular/common/http'
import {PersistenceService} from '../../../shared/services/persistence.service'

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
          catchError((errorResponse: HttpErrorResponse) =>
            // of(loginFailureAction({errors: errorResponse.error.errors}))
            of(loginFailureAction())
          )
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
