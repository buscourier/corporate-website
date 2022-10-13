import {Action, createReducer, on} from '@ngrx/store'
import {initialState} from './state'
import {
  getOrderDetailsAction,
  getOrderDetailsFailureAction,
  getOrderDetailsSuccessAction,
} from './actions/get-order-details.action'
import {
  cancelOrderAction,
  cancelOrderFailureAction,
  cancelOrderSuccessAction,
} from './actions/cancel-order.action'
import {FilterStateInterface} from '../../filter/types/filter-state.interface'
import {OrderDetailsStateInterface} from '../types/order-details-state.interface'

const detailsReducer = createReducer(
  initialState,
  on(getOrderDetailsAction, (state) => ({
    ...state,
    isLoading: true,
  })),
  on(getOrderDetailsSuccessAction, (state, action) => ({
    ...state,
    isLoading: false,
    data: action.details,
  })),
  on(getOrderDetailsFailureAction, (state) => ({
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

export function reducer(state: OrderDetailsStateInterface, action: Action) {
  return detailsReducer(state, action)
}
