import {createAction, props} from '@ngrx/store'
import {OrderInterface} from '../../types/order.interface'
import {OrdersInputInterface} from '../../types/orders-input.interface'
import {ActionTypes} from '../action-types'

export const getOrdersAction = createAction(
  ActionTypes.GET_ORDERS,
  props<{ordersInput: OrdersInputInterface}>()
)

export const getOrdersSuccessAction = createAction(
  ActionTypes.GET_ORDERS_SUCCESS,
  props<{orders: OrderInterface[]}>()
)

export const getOrdersFailureAction = createAction(
  ActionTypes.GET_ORDERS_FAILURE
)
