import {HttpErrorResponse} from '@angular/common/http'
import {Injectable} from '@angular/core'
import {Router} from '@angular/router'
import {Actions, createEffect, ofType} from '@ngrx/effects'
import {catchError, map, of, switchMap, tap} from 'rxjs'
import {PersistenceService} from '../../../shared/services/persistence.service'
import {CurrentUserInterface} from '../../../shared/types/current-user.interface'
import {AuthService} from '../../services/auth.service'
import {
  registerAction,
  registerFailureAction,
  registerSuccessAction,
} from '../actions/register.action'

@Injectable()
export class RegisterEffect {
  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private persistenceService: PersistenceService,
    private router: Router
  ) {}

  register$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(registerAction),
      switchMap(({request}) =>
        this.authService.register(request).pipe(
          map((currentUser: CurrentUserInterface) => {
            this.persistenceService.set('accessToken', currentUser.auth_key)
            return registerSuccessAction({currentUser})
          }),
          catchError((errorResponse: HttpErrorResponse) =>
            of(
              registerFailureAction({backendErrors: errorResponse.error.errors})
            )
          )
        )
      )
    )
  })

  redirectAfterSubmit$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(registerSuccessAction),
        tap(() => this.router.navigateByUrl('/'))
      )
    },
    {dispatch: false}
  )
}
