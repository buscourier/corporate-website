import {createAction, props} from '@ngrx/store'
import {BackendErrorsInterface} from '../../../../../shared/types/backend-errors.interface'
import {ReportInputInterface} from '../../types/report-input.interface'
import {ReportResponseInterface} from '../../types/report-response.interface'
import {ActionTypes} from '../action-types'

export const getOrdersAction = createAction(
  ActionTypes.GET_ORDERS,
  props<{ordersInput: ReportInputInterface}>()
)

export const getOrdersSuccessAction = createAction(
  ActionTypes.GET_ORDERS_SUCCESS,
  props<{orders: ReportResponseInterface}>()
)

export const getOrdersFailureAction = createAction(
  ActionTypes.GET_ORDERS_FAILURE,
  props<{backendErrors: BackendErrorsInterface}>()
)
