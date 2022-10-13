import {createAction, props} from '@ngrx/store'
import {ActionTypes} from '../action-types'
import {OrderDetailsInterface} from '../../types/order-details.interface'
import {OrderInterface} from '../../../../types/order.interface'

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
