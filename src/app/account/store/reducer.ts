import {Action, createReducer, on} from '@ngrx/store'
import {inititalState} from './state'
import {
  getBalanceAction,
  getBalanceFailureAction,
  getBalanceSuccessAction,
} from '../components/balance/store/actions/get-balance.action'
import {AccountStateInterface} from '../types/account-state.interface'
import {
  getUserProfileAction,
  getUserProfileFailureAction,
  getUserProfileSuccessAction,
} from './actions/get-user-profile.action'

const accountReducer = createReducer(
  inititalState,
  on(getUserProfileAction, (state: AccountStateInterface) => ({
    ...state,
    isUserProfileLoading: true,
  })),
  on(
    getUserProfileSuccessAction,
    (state: AccountStateInterface, {profile}) => ({
      ...state,
      isUserProfileLoading: false,
      userProfile: profile,
    })
  ),
  on(getUserProfileFailureAction, (state: AccountStateInterface, {errors}) => ({
    ...state,
    isUserProfileLoading: false,
    backendErrors: errors,
  }))
)

export function reducer(state: AccountStateInterface, action: Action) {
  return accountReducer(state, action)
}
