import {createAction, props} from '@ngrx/store'
import {OrderStatusInterface} from '../../types/order-status.interface'
import {ActionTypes} from '../action-types'

export const getStatusesAction = createAction(
  ActionTypes.GET_STATUSES,
  props<{orderNumber: string}>()
)

export const getStatusesSuccessAction = createAction(
  ActionTypes.GET_STATUSES_SUCCESS,
  props<{statuses: OrderStatusInterface[]}>()
)

export const getStatusesFailureAction = createAction(
  ActionTypes.GET_STATUSES_SUCCESS,
  props<{errors: string}>()
)
