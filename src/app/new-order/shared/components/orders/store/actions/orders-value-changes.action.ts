import {createAction, props} from '@ngrx/store'
import {ActionTypes} from '../action-types'

export const ordersValueChangesAction = createAction(
  ActionTypes.CHANGE_ORDERS,
  props<{orders: any}>()
)
