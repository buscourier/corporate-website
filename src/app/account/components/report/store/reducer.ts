import {Action, createReducer, on} from '@ngrx/store'
import {ReportStateInterface} from '../types/report-state.interface'
import {
  getOrderDetailsAction,
  getOrderDetailsFailureAction,
  getOrderDetailsSuccessAction,
} from './actions/get-order-details.action'
import {
  getOrdersAction,
  getOrdersFailureAction,
  getOrdersSuccessAction,
} from './actions/get-orders.action'
import {initialState} from './state'

const reportReducer = createReducer(
  initialState,
  on(getOrdersAction, (state) => ({
    ...state,
    isLoading: true,
  })),
  on(
    getOrdersSuccessAction,
    (state, action): ReportStateInterface => ({
      ...state,
      isLoading: false,
      orders: action.orders,
    })
  ),
  on(
    getOrdersFailureAction,
    (state): ReportStateInterface => ({
      ...state,
      isLoading: false,
    })
  ),
  on(
    getOrderDetailsAction,
    (state): ReportStateInterface => ({
      ...state,
      isOrderDetailsLoading: true,
    })
  ),
  on(
    getOrderDetailsSuccessAction,
    (state, {orderDetails}): ReportStateInterface => ({
      ...state,
      isOrderDetailsLoading: false,
      orderDetails,
    })
  ),
  on(
    getOrderDetailsFailureAction,
    (state, {backendErrors}): ReportStateInterface => ({
      ...state,
      isOrderDetailsLoading: false,
      backendErrors,
    })
  )
)

export function reducer(state: ReportStateInterface, action: Action) {
  return reportReducer(state, action)
}
