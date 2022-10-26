import {createAction, props} from '@ngrx/store'
import {ActionTypes} from '../action-types'
import {OrderInterface} from '../../types/order.interface'
import {ReportInputInterface} from '../../types/report-input.interface'

export const getOrdersAction = createAction(
  ActionTypes.GET_ORDERS,
  props<{ordersInput: ReportInputInterface}>()
)

export const getOrdersSuccessAction = createAction(
  ActionTypes.GET_ORDERS_SUCCESS,
  props<{orders: OrderInterface[]}>()
)

export const getOrdersFailureAction = createAction(
  ActionTypes.GET_ORDERS_FAILURE
)
