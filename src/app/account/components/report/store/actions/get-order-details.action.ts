import {createAction, props} from '@ngrx/store'
import {OrderDetailsInterface} from '../../types/order-details.interface'
import {ActionTypes} from '../action-types'

export const getOrderDetailsAction = createAction(
  ActionTypes.GET_ORDER_DETAILS,
  props<{orderId: string}>()
)

export const getOrderDetailsSuccessAction = createAction(
  ActionTypes.GET_ORDER_DETAILS_SUCCESS,
  props<{orderDetails: OrderDetailsInterface}>()
)

export const getOrderDetailsFailureAction = createAction(
  ActionTypes.GET_ORDER_DETAILS_FAILURE,
  props<{backendErrors: string}>()
)
