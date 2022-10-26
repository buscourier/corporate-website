import {
  getOrdersAction,
  getOrdersFailureAction,
  getOrdersSuccessAction,
} from './actions/get-orders.action'
import {Action, createReducer, on} from '@ngrx/store'
import {initialState} from './state'
import {ReportStateInterface} from '../types/report-state.interface'

const reportReducer = createReducer(
  initialState,
  on(getOrdersAction, (state) => ({
    ...state,
    isLoading: true,
  })),
  on(getOrdersSuccessAction, (state, action) => ({
    ...state,
    isLoading: false,
    orders: action.orders,
  })),
  on(getOrdersFailureAction, (state) => ({
    ...state,
    isLoading: false,
  }))
)

export function reducer(state: ReportStateInterface, action: Action) {
  return reportReducer(state, action)
}
