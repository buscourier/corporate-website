import {createAction, props} from '@ngrx/store'
import {NewOrderInputInterface} from '../../types/new-order-input.interface'
import {ActionTypes} from '../action-types'

export const sendOrderAction = createAction(
  ActionTypes.SEND_ORDER,
  props<{order: NewOrderInputInterface}>()
)

export const sendOrderSuccessAction = createAction(
  ActionTypes.SEND_ORDER_SUCCESS,
  props<{order: any}>() //TODO: set type of order
)

export const sendOrderFailureAction = createAction(
  ActionTypes.SEND_ORDER_FAILURE,
  props<{errors: string}>()
)
