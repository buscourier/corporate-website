import {Action, createReducer, on} from '@ngrx/store'
import {initialState} from './state'
import {
  getBalanceAction,
  getBalanceFailureAction,
  getBalanceSuccessAction,
} from './actions/get-balance.action'
import {BalanceStateInterface} from '../types/balance-state.interface'

export const balanceReducer = createReducer(
  initialState,
  on(getBalanceAction, (state: BalanceStateInterface) => ({
    ...state,
    isLoading: true,
  })),
  on(getBalanceSuccessAction, (state: BalanceStateInterface, {balance}) => ({
    ...state,
    isLoading: false,
    balance,
  })),
  on(getBalanceFailureAction, (state: BalanceStateInterface, {errors}) => ({
    ...state,
    isLoading: false,
    backendErrors: errors,
  }))
)

export function reducers(state: BalanceStateInterface, action: Action) {
  return balanceReducer(state, action)
}
