import {createAction, props} from '@ngrx/store'
import {ActionTypes} from '../action-types'
import {BalanceInterface} from '../../types/balance.interface'

export const getBalanceAction = createAction(
  ActionTypes.GET_BALANCE,
  props<{userId: string}>()
)

export const getBalanceSuccessAction = createAction(
  ActionTypes.GET_BALANCE_SUCCESS,
  props<{balance: BalanceInterface}>()
)

export const getBalanceFailureAction = createAction(
  ActionTypes.GET_BALANCE_FAILURE,
  props<{errors: string}>()
)
