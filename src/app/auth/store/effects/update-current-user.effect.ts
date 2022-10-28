import {HttpErrorResponse} from '@angular/common/http'
import {Injectable} from '@angular/core'
import {Actions, createEffect, ofType} from '@ngrx/effects'
import {catchError, map, of, switchMap} from 'rxjs'
import {CurrentUserInterface} from '../../../shared/types/current-user.interface'
import {AuthService} from '../../services/auth.service'
import {
  updateCurrentUserAction,
  updateCurrentUserFailureAction,
  updateCurrentUserSuccessAction,
} from '../actions/update-current-user.action'

@Injectable()
export class UpdateCurrentUserEffect {
  constructor(private actions$: Actions, private authService: AuthService) {}

  updateCurrentUser$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(updateCurrentUserAction),
      switchMap(({currentUserInput}) =>
        this.authService.updateCurrentUser(currentUserInput).pipe(
          map((currentUser: CurrentUserInterface) =>
            updateCurrentUserSuccessAction({currentUser})
          ),
          catchError((errorResponse: HttpErrorResponse) =>
            of(
              updateCurrentUserFailureAction({
                errors: errorResponse.error.errors,
              })
            )
          )
        )
      )
    )
  })
}
