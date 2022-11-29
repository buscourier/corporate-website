import {createAction, props} from '@ngrx/store'
import {OrderDetailsInterface} from '../../types/order-details.interface'
import {ActionTypes} from '../action-types'

export const getOrderAction = createAction(
  ActionTypes.GET_ORDER,
  props<{orderId: string}>()
)

export const getOrderSuccessAction = createAction(
  ActionTypes.GET_ORDER_SUCCESS,
  props<{details: OrderDetailsInterface}>() //TODO: order instead details?
)

export const getOrderFailureAction = createAction(
  ActionTypes.GET_ORDER_FAILURE
  // props<{errors: string}>()
)
