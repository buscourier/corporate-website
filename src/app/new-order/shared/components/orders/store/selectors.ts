import {createFeatureSelector, createSelector} from '@ngrx/store'
import {OrdersStateInterface} from '../types/orders-state.interface'
import {ORDERS_FEATURE} from './state'

export const ordersFeatureSelector =
  createFeatureSelector<OrdersStateInterface>(ORDERS_FEATURE)

export const isAllCargosLoadingSelector = createSelector(
  ordersFeatureSelector,
  (state: OrdersStateInterface) => state.isAllCargosLoading
)

export const isAllCargosLoadedSelector = createSelector(
  ordersFeatureSelector,
  (state: OrdersStateInterface) => state.isAllCargosLoaded
)

export const isAllServicesLoadingSelector = createSelector(
  ordersFeatureSelector,
  (state: OrdersStateInterface) => state.isAllServicesLoading
)

export const isAllServicesLoadedSelector = createSelector(
  ordersFeatureSelector,
  (state: OrdersStateInterface) => state.isAllServicesLoaded
)

export const allCargosSelector = createSelector(
  ordersFeatureSelector,
  (state: OrdersStateInterface) => state.allCargos
)

export const allServicesSelector = createSelector(
  ordersFeatureSelector,
  (state: OrdersStateInterface) => state.allServices
)

export const activeOrderSelector = createSelector(
  ordersFeatureSelector,
  (state: OrdersStateInterface) => state.activeOrderIndex
)

export const ordersSelector = createSelector(
  ordersFeatureSelector,
  (state: OrdersStateInterface) => state.orders
)

export const backendErrorsSelector = createSelector(
  ordersFeatureSelector,
  (state: OrdersStateInterface) => state.backendErrors
)

export const isOrdersValidSelector = createSelector(
  ordersFeatureSelector,
  (state: OrdersStateInterface) => state.isValid
)
