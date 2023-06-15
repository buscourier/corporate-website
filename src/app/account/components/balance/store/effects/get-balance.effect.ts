import {Injectable} from '@angular/core'
import {Actions, createEffect, ofType} from '@ngrx/effects'
import {switchMap} from 'rxjs/operators'
import {
  getBalanceAction,
  getBalanceFailureAction,
  getBalanceSuccessAction,
} from '../actions/get-balance.action'
import {catchError, map, of} from 'rxjs'
import {HttpErrorResponse} from '@angular/common/http'
import {AccountService} from '../../../../services/account.service'
import {BalanceInterface} from '../../types/balance.interface'

@Injectable()
export class GetBalanceEffect {
  //TODO: accountService or service?
  constructor(
    private actions$: Actions,
    private accountService: AccountService
  ) {}

  getBalance$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(getBalanceAction),
      switchMap(({userId}) => {
        return this.accountService.getBalance(userId).pipe(
          map((balance: BalanceInterface) => {
            return getBalanceSuccessAction({balance})
          }),
          catchError((errorResponse: HttpErrorResponse) => {
            //TODO: refactor errors in all effects
            return of(
              getBalanceFailureAction({errors: errorResponse.error.error})
            )
          })
        )
      })
    )
  })
}
