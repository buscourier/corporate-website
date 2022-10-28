import {Action, createReducer, on} from '@ngrx/store'
import {OrdersStateInterface} from '../types/orders-state.interface'
import {
  getOrdersAction,
  getOrdersFailureAction,
  getOrdersSuccessAction,
} from './actions/get-orders.action'
import {initialState} from './state'

const ordersReducer = createReducer(
  initialState,
  on(getOrdersAction, (state) => ({
    ...state,
    isLoading: true,
  })),
  on(getOrdersSuccessAction, (state, action) => ({
    ...state,
    isLoading: false,
    data: action.orders,
  })),
  on(getOrdersFailureAction, (state) => ({
    ...state,
    isLoading: false,
  }))
)

export function reducer(state: OrdersStateInterface, action: Action) {
  return ordersReducer(state, action)
}
