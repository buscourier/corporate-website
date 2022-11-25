import {createAction, props} from '@ngrx/store'
import {ActionTypes} from '../action-types'

export const sendOrderAction = createAction(
  ActionTypes.SEND_ORDER,
  props<{order: any}>() //TODO: set type of order
)

export const sendOrderSuccessAction = createAction(
  ActionTypes.SEND_ORDER_SUCCESS
)

export const sendOrderFailureAction = createAction(
  ActionTypes.SEND_ORDER_FAILURE,
  props<{errors: string}>()
)
