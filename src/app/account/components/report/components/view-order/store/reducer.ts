import {Action, createReducer, on} from '@ngrx/store'
import {ViewOrderStateInterface} from '../types/view-order-state.interface'
import {
  cancelOrderAction,
  cancelOrderFailureAction,
  cancelOrderSuccessAction,
} from './actions/cancel-order.action'
import {initialState} from './state'

const viewOrderReducer = createReducer(
  initialState,
  on(
    cancelOrderAction,
    (state): ViewOrderStateInterface => ({
      ...state,
      isSubmitting: true,
    })
  ),
  on(
    cancelOrderSuccessAction,
    (state): ViewOrderStateInterface => ({
      ...state,
      isSubmitting: false,
    })
  ),
  on(
    cancelOrderFailureAction,
    (state, {backendErrors}): ViewOrderStateInterface => ({
      ...state,
      isSubmitting: false,
      backendErrors,
    })
  )
)

export function reducer(state: ViewOrderStateInterface, action: Action) {
  return viewOrderReducer(state, action)
}
