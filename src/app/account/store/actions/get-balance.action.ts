import {createAction, props} from '@ngrx/store'
import {ActionTypes} from '../action-types'

export const getBalanceAction = createAction(
  ActionTypes.GET_BALANCE,
  props<{userId: string}>()
)

export const getBalanceSuccessAction = createAction(
  ActionTypes.GET_BALANCE_SUCCESS,
  props<{balance: any}>()
)

export const getBalanceFailureAction = createAction(
  ActionTypes.GET_BALANCE_FAILURE,
  props<{errors: string}>()
)
