import {createAction, props} from '@ngrx/store'
import {OrderStateInterface} from '../../../order/types/order-state.interface'
import {ActionTypes} from '../action-types'

export const ordersValueChangesAction = createAction(
  ActionTypes.CHANGE_ORDERS,
  props<{orders: OrderStateInterface[]}>()
)
