import {Action, createReducer, on} from '@ngrx/store'
import {ReportDetailsStateInterface} from '../types/report-details-state.interface'
import {
  cancelOrderAction,
  cancelOrderFailureAction,
  cancelOrderSuccessAction,
} from './actions/cancel-order.action'
import {
  getOrderAction,
  getOrderFailureAction,
  getOrderSuccessAction,
} from './actions/get-order.action'
import {initialState} from './state'

const detailsReducer = createReducer(
  initialState,
  on(getOrderAction, (state) => ({
    ...state,
    isLoading: true,
  })),
  on(getOrderSuccessAction, (state, action) => ({
    ...state,
    isLoading: false,
    order: action.details,
  })),
  on(getOrderFailureAction, (state) => ({
    ...state,
    isLoading: false,
  })),
  on(cancelOrderAction, (state) => ({
    ...state,
    isSubmitting: true,
  })),
  on(cancelOrderSuccessAction, (state) => ({
    ...state,
    isSubmitting: false,
    orderCanceled: true,
  })),
  on(cancelOrderFailureAction, (state) => ({
    ...state,
    isSubmitting: false,
  }))
)

export function reducer(state: ReportDetailsStateInterface, action: Action) {
  return detailsReducer(state, action)
}
