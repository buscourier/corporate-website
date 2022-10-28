import {createAction, props} from '@ngrx/store'
import {OrderInterface} from '../../../../types/order.interface'
import {ActionTypes} from '../action-types'

export const cancelOrderAction = createAction(
  ActionTypes.CANCEL_ORDER,
  props<{order: OrderInterface}>()
)

export const cancelOrderSuccessAction = createAction(
  ActionTypes.CANCEL_ORDER_SUCCESS
  // props<{order: OrderInterface}>()
)

export const cancelOrderFailureAction = createAction(
  ActionTypes.CANCEL_ORDER_FAILURE
  // props<{errors: string}>()
)
