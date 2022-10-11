import {createFeatureSelector, createSelector} from '@ngrx/store'
import {OrdersStateInterface} from '../types/orders-state.interface'
import {ORDERS_FEATURE} from './state'

export const ordersFeatureSelector =
  createFeatureSelector<OrdersStateInterface>(ORDERS_FEATURE)

export const isLoadingSelector = createSelector(
  ordersFeatureSelector,
  (state: OrdersStateInterface) => state.isLoading
)

export const ordersSelector = createSelector(
  ordersFeatureSelector,
  (state: OrdersStateInterface) => state.data
)

// export const backendErrorsSelector = createSelector(
//   ordersFeatureSelector,
//   // (state: OrdersStateInterface) => state.errors
// )
