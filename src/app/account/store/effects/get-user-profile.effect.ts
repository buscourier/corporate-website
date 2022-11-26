import {Injectable} from '@angular/core'
import {AccountService} from '../../services/account.service'
import {Actions, createEffect, ofType} from '@ngrx/effects'
import {
  getUserProfileAction,
  getUserProfileFailureAction,
  getUserProfileSuccessAction,
} from '../actions/get-user-profile.action'
import {catchError, map, of, switchMap} from 'rxjs'
import {HttpErrorResponse} from '@angular/common/http'
import {getBalanceFailureAction} from '../actions/get-balance.action'

@Injectable()
export class GetUserProfileEffect {
  constructor(
    private actions$: Actions,
    private accountService: AccountService
  ) {}

  getProfile$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(getUserProfileAction),
      switchMap(({userId}) => {
        return this.accountService.getProfile(userId).pipe(
          map((profile: any) => {
            return getUserProfileSuccessAction({profile})
          }),
          catchError((errorResponse: HttpErrorResponse) => {
            //TODO: refactor errors in all effects
            return of(
              getUserProfileFailureAction({errors: errorResponse.error.error})
            )
          })
        )
      })
    )
  })
}
